/////////////////////////////////////////////////////////////////
//GBridge
/////////////////////////////////////////////////////////////////
var GLog = require('./glog').GLog;

var inWeex = typeof callNative !== 'undefined';
var debug = true;
var canvasModule;
__weex_define__('@weex-temp/x', function (__weex_require__) {
    canvasModule = __weex_require__('@weex-module/gcanvas');
});

var GBridge = {
    /**执行render指令*/
    callRender: function (commands) {
        if (!inWeex) {
            return;
        }
        GLog.d('bridge#callRender() commands is ' + commands);
        canvasModule.render({commands: [commands]});
    },

    preLoadImage: function (commands) {
        if (!inWeex) {
            return;
        }
        GLog.d('bridge#preLoadImage() commands is ' + commands);
        canvasModule.preLoadImage({commands: commands}, function (e) {
        });
    },

    /**
     * 获取canvas引用
     * @param ref wx-canvas 引用
     * @param configArray 配置参数
     **/
    callEnable: function (ref,configArray) {
        if (!inWeex) {
            return;
        }
        var params = {
            componentId: ref,
            config:configArray
        };
        canvasModule.enable(params, function (e) {
            GLog.d('bridge#callEnable() return val:' + JSON.stringify(e));
            if (!e || e.result === 'fail') {//failed
                //TODO
            }
        });
    },


    /**
     * 获取canvas引用
     * @param ref wx-canvas 引用
     * @param configArray 配置参数
     **/
    callDisable: function () {
        if (!inWeex) {
            return;
        }
        var params = {
            
        };
        canvasModule.disable(params);
    },

    /**
     * 获取设备信息(android)
     * @param callback 设备信息
     **/
    getDeviceInfo: function (callback) {
        if (!inWeex) {
            return;
        }
        canvasModule.getDeviceInfo({}, function (e) {
            GLog.d('bridge#getDeviceInfo() return val:' + JSON.stringify(e));
            callback && callback(e);
        });
    },

    /**
     *
     * 设置context类型,2d或者webgl
     *
     * @param context_type 0代表2d,1代表3d
     * */
    setContextType: function (context_type){
        if(context_type != 1 && context_type != 2){
            GLog.d('bridge#setContextType(): invalid context type===>' + context_type);
            return;
        }
        GLog.d('bridge#setContextType(): context type is ' + context_type);
       canvasModule.setContextType({type:context_type});
    }
};


module.exports = {
    GBridge: GBridge,
    GLog: GLog
};
