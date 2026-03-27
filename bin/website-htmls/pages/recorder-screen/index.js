import { defineElement, ref } from "zipaper"
import template from "./index.html"
import style from "./index.scss"

var mediaRecorder;
export default defineElement({
    template,
    data() {
        return {
            isRun: ref(false),
            includeSystemAudio: ref(true),
            includeMicrophoneAudio: ref(true)
        }
    },
    methods: {

        // 开始录制（根据用户选择包含音频）
        startRecorder: function () {
            var _this = this;

            if (!this.isRun) {
                var videoEl = document.getElementById("video-el");

                // 静音播放防止回音
                videoEl.muted = true;

                // 根据用户选择获取屏幕内容
                navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: _this.includeSystemAudio || _this.includeMicrophoneAudio
                }).then(function (displayStream) {

                    // 如果用户选择包含麦克风音频，尝试获取麦克风流
                    if (_this.includeMicrophoneAudio) {
                        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (micStream) {

                            _this.isRun = true;

                            // 根据用户选择创建音频混合
                            var AudioCtx = window.AudioContext || window.webkitAudioContext;
                            var audioCtx = new AudioCtx();
                            var destination = audioCtx.createMediaStreamDestination();

                            // 如果用户选择包含系统音频且屏幕流包含音频，则将其接入混音
                            if (_this.includeSystemAudio && displayStream.getAudioTracks().length) {
                                try {
                                    var displaySource = audioCtx.createMediaStreamSource(displayStream);
                                    displaySource.connect(destination);
                                } catch (e) {
                                    console.warn('display audio connect failed', e);
                                }
                            }

                            // 如果用户选择包含麦克风音频，将麦克风接入混音
                            if (_this.includeMicrophoneAudio) {
                                try {
                                    var micSource = audioCtx.createMediaStreamSource(micStream);
                                    micSource.connect(destination);
                                } catch (e) {
                                    console.warn('mic audio connect failed', e);
                                }
                            }

                            // 构造最终用于录制的流：视频来自屏幕，音频根据用户选择
                            var combinedStream = new MediaStream();
                            var vTrack = displayStream.getVideoTracks()[0];
                            if (vTrack) combinedStream.addTrack(vTrack);

                            // 无论用户选择了哪种音频，都尝试添加音频轨道
                            // 这样可以确保当用户选择包含音频时，音频轨道总是被添加到录制流中
                            destination.stream.getAudioTracks().forEach(function (t) {
                                combinedStream.addTrack(t);
                            });

                            // 视频预览使用合并流（已静音）
                            videoEl.srcObject = combinedStream;
                            videoEl.onloadedmetadata = function () {
                                videoEl.play();
                            };

                            // 创建 MediaRecorder 并录制
                            mediaRecorder = new MediaRecorder(combinedStream, {
                                mimeType: MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
                            });

                            var chunks = [];
                            mediaRecorder.addEventListener("dataavailable", function (event) {
                                if (event.data && event.data.size) chunks.push(event.data);
                            });

                            // 当屏幕停止共享时结束录制
                            if (displayStream.getVideoTracks()[0]) {
                                displayStream.getVideoTracks()[0].onended = function () {
                                    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
                                };
                            }

                            mediaRecorder.addEventListener("stop", function () {
                                // 停止流与释放资源
                                try { displayStream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) { }
                                try { micStream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) { }
                                try { audioCtx.close(); } catch (e) { }

                                if (!chunks.length) {
                                    _this.isRun = false;
                                    mediaRecorder = null;
                                    return;
                                }

                                var blob = new Blob(chunks, { type: chunks[0].type });
                                var url = URL.createObjectURL(blob);
                                var downEl = document.createElement("a");
                                downEl.href = url;
                                downEl.download = "屏幕录制.webm";
                                downEl.click();
                                _this.isRun = false;
                                mediaRecorder = null;
                            });

                            mediaRecorder.start();

                        }).catch(function (micErr) {
                            // 获取麦克风失败，根据用户选择降级处理
                            console.warn('getUserMedia(mic) failed, fallback based on user selection', micErr);
                            _this.isRun = true;

                            // 如果用户没有要求麦克风音频，或者屏幕流没有音频，直接使用屏幕流
                            if (!_this.includeMicrophoneAudio || !displayStream.getAudioTracks().length) {
                                videoEl.srcObject = displayStream;
                                videoEl.onloadedmetadata = function () { videoEl.play(); };

                                mediaRecorder = new MediaRecorder(displayStream, {
                                    mimeType: MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
                                });
                            } else {
                                // 用户要求麦克风音频但获取失败，尝试使用屏幕流中的音频（如果存在）
                                if (displayStream.getAudioTracks().length > 0) {
                                    alert("无法获取麦克风权限，将使用系统音频进行录制");
                                } else {
                                    alert("无法获取麦克风权限，且屏幕流无音频，将录制无声视频");
                                }
                                videoEl.srcObject = displayStream;
                                videoEl.onloadedmetadata = function () { videoEl.play(); };

                                mediaRecorder = new MediaRecorder(displayStream, {
                                    mimeType: MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
                                });
                            }

                            var chunks2 = [];
                            mediaRecorder.addEventListener("dataavailable", function (event) {
                                if (event.data && event.data.size) chunks2.push(event.data);
                            });

                            if (displayStream.getVideoTracks()[0]) {
                                displayStream.getVideoTracks()[0].onended = function () {
                                    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
                                };
                            }

                            mediaRecorder.addEventListener("stop", function () {
                                try { displayStream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) { }
                                if (!chunks2.length) { _this.isRun = false; mediaRecorder = null; return; }
                                var blob = new Blob(chunks2, { type: chunks2[0].type });
                                var url = URL.createObjectURL(blob);
                                var downEl = document.createElement("a");
                                downEl.href = url;
                                downEl.download = "屏幕录制.webm";
                                downEl.click();
                                _this.isRun = false;
                                mediaRecorder = null;
                            });

                            mediaRecorder.start();
                        });
                    } else {
                        // 用户没有选择包含麦克风音频，直接使用屏幕流
                        _this.isRun = true;

                        videoEl.srcObject = displayStream;
                        videoEl.onloadedmetadata = function () { videoEl.play(); };

                        mediaRecorder = new MediaRecorder(displayStream, {
                            mimeType: MediaRecorder.isTypeSupported("video/webm; codecs=vp9") ? "video/webm; codecs=vp9" : "video/webm"
                        });

                        var chunks3 = [];
                        mediaRecorder.addEventListener("dataavailable", function (event) {
                            if (event.data && event.data.size) chunks3.push(event.data);
                        });

                        if (displayStream.getVideoTracks()[0]) {
                            displayStream.getVideoTracks()[0].onended = function () {
                                if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
                            };
                        }

                        mediaRecorder.addEventListener("stop", function () {
                            try { displayStream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) { }
                            if (!chunks3.length) { _this.isRun = false; mediaRecorder = null; return; }
                            var blob = new Blob(chunks3, { type: chunks3[0].type });
                            var url = URL.createObjectURL(blob);
                            var downEl = document.createElement("a");
                            downEl.href = url;
                            downEl.download = "屏幕录制.webm";
                            downEl.click();
                            _this.isRun = false;
                            mediaRecorder = null;
                        });

                        mediaRecorder.start();
                    }

                }).catch(function (event) {
                    alert("用户取消l了屏幕共享或发生错误，无法开始录制！");
                    console.error('getDisplayMedia error:', event);
                });

            } else {
                alert("正在录制中，请点击‘完成’按钮结束后再启动新的录制程序！");
            }

        }
    },
    style: {
        content: style
    }
})