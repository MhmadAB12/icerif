function sendUserInfo(userInfo) {
    // لإرسال المعلومات إلى ملف نصي على جهازك
    const fileContent = JSON.stringify(userInfo, null, 2); // تحويل الكائن إلى سلسلة نصية بتنسيق JSON
    const blob = new Blob([fileContent], { type: 'text/plain' }); // إنشاء كائن Blob من السلسلة النصية
    const url = URL.createObjectURL(blob); // إنشاء رابط URL لكائن Blob
    const link = document.createElement('a'); // إنشاء عنصر رابط
    link.href = url;
    link.download = 'user_info.txt'; // تعيين اسم الملف للتنزيل
    link.click(); // فتح نافذة حفظ الملف
  
    // لإرسال المعلومات إلى سيرفر
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/save-user-info', true); // تعيين طريقة الطلب والرابط
    xhr.setRequestHeader('Content-Type', 'application/json'); // تعيين رأس الطلب
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log('User information sent successfully');
      }
    };
    xhr.send(JSON.stringify(userInfo)); // إرسال المعلومات إلى السيرفر
  }
  
  function collectUserInfo() {
    const name = prompt("Please enter your name:");
    const email = prompt("Please enter your email:");
    const address = prompt("Please enter your address:");
  
    if (name && email) {
      const userInfo = {
        name,
        email,
        address,
        ...getDeviceInfo()
      };
  
      sendUserInfo(userInfo); // إرسال معلومات المستخدم
    } else {
      console.log("User canceled or did not provide required information.");
    }
  }
  
  function getDeviceInfo() {
    const deviceInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      aa : navigator.cookieEnabled ,
      bb : navigator.geolocation ,
      dd : navigator.onLine ,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ,
  
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory,
      screenWidth: screen.width,
      screenHeight: screen.height,
      pixelRatio: window.devicePixelRatio,
      onlinestatus: navigator.onLine,
      batteryLevel: getBatteryLevel(),
      vv : navigator.registerProtocolHandler ,
      mm : Navigator.Promise ,
      ll : NamedNodeMap.call ,
      kk : NavigationPreloadManager.prototype ,
      jj : NavigationPreloadManager.DateTimeFormat ,
      pp : NavigationPreloadManager.NamedNodeMap ,
  
    };
    return deviceInfo;
  }
  
  function getBatteryLevel() {
    return new Promise((resolve, reject) => {
      if (!navigator.getBattery) {
        resolve(null);
      } else {
        navigator.getBattery().then(battery => {
          let batteryLevel = battery.level * 100;
          resolve(batteryLevel);
        }).catch(error => {
          resolve(null);
        });
      }
    });
  }
  


  
  
  window.addEventListener('load', () => {
    collectUserInfo();
  });