/**
 * Created by ���� on 2016/10/28.
 */

/**
 * ������ػ���������
 */

/**
 *
 * native������ݷ��ظ�ʽ:
 * {
        code: 0,//0�ɹ���1ʧ��
        msg: '����ʱ'//ʧ��ʱ�����ʾ���ɹ���Ϊ��
        data: {}//����,�����ݿ���Ϊ��
        };
 */

/**
 *H5��native��ֵ�����ݸ�ʽ��json��ʽ
 *{
 *  data:''  H5����native��ֵ
 *  method��'',����native����֮���ٵ���H5�ķ�����
 *  isVlaue: boolen  �Ƿ���Ҫ��H5��ֵ
 *}
 */

// �����ݸ�ʽ�Ǵ˷���GOMEUtil.JsBridge(data,callback)�ĵ�һ������,�ڶ���������H5����ԭ�����͹���������,���ڴ˷�����������ݽ��д���,���ݸ�ʽΪ

/**
 *   H5��ԭ������ʱ������ݸ�ʽ;
 *   �����ݸ�ʽ��������������H5��ԭ���Ľ�����ʽ:
 *   1)H5ֻ�ǽ�������,���������κεĲ���,��ô���ݸ�ʽΪ:
 *       {
 *              nativeMethod: 'nativeMethod',  // �ش�
 *               data: {
 *                   method: 'H5CallBackFn',  // H5 ��Ҫִ�еķ���
 *                   isValue: true,         // true:H5��Ҫִ�з��� false: H5����Ҫִ�лص�����
 *                   data: ''               // H5���͸�Native������
 *               }
 *        };
 *   2)H5����Nativ��Ҫִ��ʲôNative����,��ô���ݸ�ʽΪ:
 *       {
 *              nativeMethod: 'nativeMethod',  // ��Ҫִ��Native����
 *               data: {
 *                   method: '', // H5 ��Ҫִ�еķ���
 *                   isValue: false,         // true:H5��Ҫִ�з��� false: H5����Ҫִ�лص�����
 *                   data: ''               // H5���͸�Native������
 *               }
 *        };
 *   3)H5����Nativ��Ҫִ��ʲôNative����,����H5����Native��Ҫ����ʲôH5�ص�����,��ô���ݸ�ʽΪ:
 *       {
 *              nativeMethod: 'NativeFn',  // ����Ҫִ���κ�Native����
 *               data: {
 *                   method: 'H5CallBackFn', // H5 ��Ҫִ�еķ���
 *                   isValue: true,         // true:H5��Ҫִ�з��� false: H5����Ҫִ�лص�����
 *                   data: ''               // H5���͸�Native������
 *               }
 *        };
 *
 */

export default function GOMEUtil() {}

/**
 * ��⵱ǰ������Ƿ�ΪiPhone(Safari)
 */
GOMEUtil.isIPhone = function() {
    var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > -1) {
        return true;
    }
    return false;
};
/**
 * ��⵱ǰ������Ƿ�ΪAndroid(Chrome)
 */
GOMEUtil.isAndroid = function() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Android') > -1) {
        return true;
    }
    return false;
};
GOMEUtil.JsBridge = function(data, callback) {
    if (!data) return;
    if (!window.webkit && !window.androidWebView) return;
    if (GOMEUtil.isAndroid()) {
        let jsonStr = JSON.stringify(data);
        window.androidWebView.jsBridge(jsonStr);
        window[data.data.method] = (function(callback) {
            return callback;
        })(callback);
        return false;
    } else if (GOMEUtil.isIPhone()) {
        window.webkit.messageHandlers.utils.postMessage(data);
        window[data.data.method] = (function(callback) {
            return callback;
        })(callback);
        return false;
    }
};
/**
 * ��ͬ�ļ��з�װ
 */
/**
 * ��ȡuserInfo
 */
GOMEUtil.gotOptNo = function(gomeutil, that) {
    gomeutil.JsBridge({
        nativeMethod: 'obtainUserInfo',
        data: {
            data: '',
            method: 'getUserInfo',
            isValue: true
        }
    }, function (data) {
        window.localStorage.setItem('userInfo', data);
        that.$store.dispatch('userInfo', data);
    });
};
/**
 * ��ȡtoken
 */
GOMEUtil.gotToken = function(gomeutil, that) {
    gomeutil.JsBridge({
        nativeMethod: 'obtainToken',
        data: {
            data: '',
            method: 'getToken',
            isValue: true
        }
    }, function (data) {
        that.$store.dispatch('userInfo', data);
    });
};
/**
 * ����ԭ��
 */
GOMEUtil.back2Native = function(gomeutil) {
    gomeutil.JsBridge({
        nativeMethod: 'closePage',
        data: {
            data: '',
            method: '',
            isValue: false
        }
    });
};
/**
 * ���ص�ԭ���ĵ�¼ҳ�� --- ע����¼
 */
GOMEUtil.back2Sign = function(gomeutil) {
    gomeutil.JsBridge({
        nativeMethod: 'logOut',
        data: {
            data: '',
            method: '',
            isValue: false
        }
    });
};
/**
 * �ж��豸�ǰ�׿����ios�ǰ�׿���� 01 ��ios���� 02
 */
GOMEUtil.isDevice = function () {
    if (GOMEUtil.isAndroid()) {
        return '01';
    } else if (GOMEUtil.isIPhone) {
        return '02';
    }
};
/**
 * ������
 */
GOMEUtil.refreshVersion = function (gomeutil) {
    gomeutil.JsBridge({
        nativeMethod: 'refreshVersion',
        data: {
            data: '',
            method: '',
            isValue: false
        }
    });
};
/**
 * ��ȡ��ǰ�汾��Ϣ
 * ��Ҫ�汾��
 */
GOMEUtil.gotVersion = function(gomeutil, that) {
    gomeutil.JsBridge({
        nativeMethod: 'obtainVersion',
        data: {
            data: '',
            method: 'getVersion',
            isValue: true
        }
    }, function (data) {
        that.$store.dispatch('userInfo', data);
    });
};
/**
 * �����ϴ���װ --- �Ժ���ܻ��õ�
 */
GOMEUtil.takePhoto = function (gomeutil, that, param) {
    gomeutil.JsBridge({
        nativeMethod: 'getPhoto',
        data: {
            data: param,
            method: 'mycaddPhoto',
            isValue: true
        }
    }, function (data) {
        /**
         * ��Ƭ
         */
    });
};
/**
 * �������ѡ�� --- �Ժ���ܻ��õ�
 */
GOMEUtil.fromFrames = function (gomeutil, that, param) {
    gomeutil.JsBridge({
        nativeMethod: 'selectPhoto',
        data: {
            data: param,
            method: 'mycaddSelectPic',
            isValue: true
        }
    }, function (data) {
        /**
         * ��Ƭ
         */
    });
};
/**
 * �����������  js2 NATIVE
 */
GOMEUtil.goEurLex = function(gomeutil) {
    gomeutil.JsBridge({
        nativeMethod: 'eurLex',
        data: {
            data: '',
            method: '',
            isValue: false
        }
    });
};
/**
 * ��������
 */
GOMEUtil.continue = function(gomeutil, config) {
    gomeutil.JsBridge({
        nativeMethod: 'proceeding',
        data: {
            data: config,
            method: '',
            isValue: false
        }
    });
};
/**
 * ��Native����ҳ��� '���׷�', Native���Ѿ���ȡ��'������','������','�ϴ������'����������������H5;
 * ��;: ��Ϊ�����������������ӿ�,��˵��Native'���׷�'����H5,����������������H5,�����������νӿ�,ͬʱҲ����H5�Ŀ���
 */
GOMEUtil.GetPieceCount = function() {
    GOMEUtil.JsBridge({
        nativeMethod: 'nativePieceCount',
        data: {
            data: '',
            method: 'h5PieceCount',
            isValue: true
        }
    }, function(data) {
        window.localStorage.setItem('pieceCount', data);
    });
};
