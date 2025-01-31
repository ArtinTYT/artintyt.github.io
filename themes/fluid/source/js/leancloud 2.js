/* global CONFIG */
// eslint-disable-next-line no-console

(function(window, document) {
  // 获取记录或创建记录
  async function getRecord(Counter, target) {
    try {
      const response = await Counter('get', `/classes/Counter?where=${encodeURIComponent(JSON.stringify({ target }))}`);
      const data = await response.json();
      const { results, code, error } = data;

      if (code === 401) throw error;

      if (results && results.length > 0) {
        return results[0]; // 返回现有记录
      } else {
        const newRecord = { target, time: 0 };
        const createResponse = await Counter('post', '/classes/Counter', newRecord);
        const createData = await createResponse.json();
        if (createData.error) throw createData.error;
        return createData; // 创建并返回新记录
      }
    } catch (error) {
      console.error('LeanCloud Counter Error: ', error);
      throw error;
    }
  }

  // 发起批量自增请求
  async function increment(Counter, incrArr) {
    try {
      const response = await Counter('post', '/batch', { requests: incrArr });
      const data = await response.json();
      if (data.error) throw data.error;
    } catch (error) {
      console.error('Failed to save visitor count: ', error);
      throw error;
    }
  }

  // 构建自增请求体
  function buildIncrement(objectId) {
    return {
      method: 'PUT',
      path: `/1.1/classes/Counter/${objectId}`,
      body: {
        'time': {
          '__op': 'Increment',
          'amount': 1
        }
      }
    };
  }

  // 校验是否为有效的 Host
  function validHost() {
    if (CONFIG.web_analytics.leancloud.ignore_local) {
      const hostname = window.location.hostname;
      return hostname !== 'localhost' && hostname !== '127.0.0.1';
    }
    return true;
  }

  // 校验是否为有效的 UV
  function validUV() {
    const key = 'LeanCloud_UV_Flag';
    const flag = localStorage.getItem(key);
    if (flag) {
      if (new Date().getTime() - parseInt(flag, 10) <= 86400000) {
        return false;
      }
    }
    localStorage.setItem(key, new Date().getTime().toString());
    return true;
  }

  // 更新计数
  async function addCount(Counter) {
    const enableIncr = CONFIG.web_analytics.enable && !Fluid.ctx.dnt && validHost();
    const getterArr = [];
    const incrArr = [];

    // 更新 PV
    const pvCtn = document.querySelector('#leancloud-site-pv-container');
    if (pvCtn) {
      const pvGetter = getRecord(Counter, 'site-pv').then((record) => {
        if (enableIncr) incrArr.push(buildIncrement(record.objectId));
        const ele = document.querySelector('#leancloud-site-pv');
        if (ele) {
          ele.innerText = (record.time || 0) + (enableIncr ? 1 : 0);
          pvCtn.style.display = 'inline';
        }
      });
      getterArr.push(pvGetter);
    }

    // 更新 UV
    const uvCtn = document.querySelector('#leancloud-site-uv-container');
    if (uvCtn) {
      const uvGetter = getRecord(Counter, 'site-uv').then((record) => {
        const incrUV = validUV() && enableIncr;
        if (incrUV) incrArr.push(buildIncrement(record.objectId));
        const ele = document.querySelector('#leancloud-site-uv');
        if (ele) {
          ele.innerText = (record.time || 0) + (incrUV ? 1 : 0);
          uvCtn.style.display = 'inline';
        }
      });
      getterArr.push(uvGetter);
    }

    // 更新页面视图
    const viewCtn = document.querySelector('#leancloud-page-views-container');
    if (viewCtn) {
      const path = eval(CONFIG.web_analytics.leancloud.path || 'window.location.pathname');
      const target = decodeURI(path.replace(/\/*(index.html)?$/, '/'));
      const viewGetter = getRecord(Counter, target).then((record) => {
        if (enableIncr) incrArr.push(buildIncrement(record.objectId));
        const ele = document.querySelector('#leancloud-page-views');
        if (ele) {
          ele.innerText = (record.time || 0) + (enableIncr ? 1 : 0);
          viewCtn.style.display = 'inline';
        }
      });
      getterArr.push(viewGetter);
    }

    // 批量发起自增请求
    if (enableIncr) {
      await Promise.all(getterArr);
      if (incrArr.length > 0) {
        await increment(Counter, incrArr);
      }
    }
  }

  const appId = CONFIG.web_analytics.leancloud.app_id;
  const appKey = CONFIG.web_analytics.leancloud.app_key;
  const serverUrl = CONFIG.web_analytics.leancloud.server_url;

  if (!appId) throw new Error('LeanCloud appId is empty');
  if (!appKey) throw new Error('LeanCloud appKey is empty');

  async function fetchData(apiServer) {
    const Counter = (method, url, data) => {
      return fetch(`${apiServer}/1.1${url}`, {
        method,
        headers: {
          'X-LC-Id': appId,
          'X-LC-Key': appKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    };

    await addCount(Counter);
  }

  const apiServer = serverUrl || `https://${appId.slice(0, 8).toLowerCase()}.api.lncldglobal.com`;

  if (apiServer) {
    fetchData(apiServer);
  } else {
    fetch('https://app-router.leancloud.cn/2/route?appId=' + appId)
      .then(resp => resp.json())
      .then((data) => {
        if (data.api_server) {
          fetchData('https://' + data.api_server);
        }
      });
  }
})(window, document);
