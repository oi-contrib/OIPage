//当前正在运动的动画的tick函数堆栈
let $timers = [];
//唯一定时器的定时间隔
let $interval = 13;
//定时器ID
let $timerId;

/**
 * 动画轮播
 * @param {function} doback 轮询函数，有一个形参deep，0-1，表示执行进度
 * @param {number} duration 动画时长，可选
 * @param {function} callback 动画结束回调，可选，有一个形参deep，0-1，表示执行进度
 *
 * @returns {object} 返回一个对象，包含一个stop方法，用于在动画结束前结束动画
 */
function animation(doback, duration, callback) {
    if (arguments.length < 2) duration = 400;
    if (arguments.length < 3) callback = function () { };

    let clock = {
        //把tick函数推入堆栈
        "timer": function (tick, duration, callback) {
            if (!tick) {
                throw new Error('Tick is required!');
            }
            let id = new Date().valueOf() + "_" + (Math.random() * 1000).toFixed(0);
            $timers.push({
                "id": id,
                "createTime": new Date(), // 开始时间
                "pauseTime": -1, // 暂停的时间，继续运行的时候，借助此计算暂停的时间差
                "pauseKeepTime": 0, // 暂停用去的时间
                "status": "running", // running(运行中), paused(暂停中)
                "tick": tick,
                "duration": duration,
                "callback": callback
            });
            clock.start();
            return id;
        },

        //开启唯一的定时器timerId
        "start": function () {
            if (!$timerId) {
                try {
                    if (globalThis && globalThis.requestAnimationFrame) {
                        $timerId = globalThis.requestAnimationFrame(function step() {
                            clock.tick();
                            if ($timerId) $timerId = globalThis.requestAnimationFrame(step);
                        });
                    } else {
                        $timerId = setInterval(clock.tick, $interval);
                    }
                } catch (e) {
                    $timerId = setInterval(clock.tick, $interval);
                }
            }
        },

        //被定时器调用，遍历timers堆栈
        "tick": function () {
            let createTime, flag, tick, callback, timer, duration, passTime, timers = $timers;

            $timers = [];
            $timers.length = 0;

            for (flag = 0; flag < timers.length; flag++) {
                //初始化数据
                timer = timers[flag];
                createTime = timer.createTime;
                tick = timer.tick;
                duration = timer.duration;
                callback = timer.callback;

                //执行
                passTime = (+new Date().valueOf() - createTime.valueOf() - timer.pauseKeepTime) / duration;
                passTime = passTime > 1 ? 1 : passTime;

                if (timer.status === "running") {
                    tick(passTime);
                }

                // 只有当动画没有结束或者动画处于暂停状态时，才继续添加到timers堆栈
                if ((passTime < 1 || timer.status === "paused") && timer.id) {
                    //动画没有结束再添加
                    $timers.push(timer);
                } else {
                    callback(passTime);
                }

            }
            if ($timers.length <= 0) {
                clock.stop();
            }
        },

        //停止定时器，重置timerId=null
        "stop": function () {
            if ($timerId) {
                try {
                    if (globalThis && globalThis.requestAnimationFrame) globalThis.cancelAnimationFrame($timerId);
                    else clearInterval($timerId);
                } catch (e) {
                    clearInterval($timerId);
                }
                $timerId = null;
            }
        }
    };

    let id = clock.timer(function (deep) {
        //其中deep为0-1，表示改变的程度
        doback(deep);
    }, duration, callback);

    return {
        // 结束动画
        stop: function () {
            for (let i in $timers) {
                if ($timers[i].id == id) {
                    $timers[i].id = void 0;
                }
            }
        },
        // 暂停动画
        pause: function () {
            for (let i in $timers) {
                if ($timers[i].id == id) {
                    if ($timers[i].pauseTime === -1) {
                        $timers[i].pauseTime = new Date();
                        $timers[i].status = "paused";
                    }
                }
            }
        },
        // 继续动画
        resume: function () {
            for (let i in $timers) {
                if ($timers[i].id == id) {
                    if ($timers[i].pauseTime !== -1) {
                        $timers[i].pauseKeepTime += (new Date().valueOf() - $timers[i].pauseTime.valueOf());
                        $timers[i].pauseTime = -1;
                        $timers[i].status = "running";
                    }
                }
            }
        }
    };

}