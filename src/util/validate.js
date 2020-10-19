 import api from '@/fetch/api'

// 验证手机号
export function isPhoneNumber(mobile) {
  var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|145|147|149|173|175|176|177|178|198)+\d{8})$/;
  if (!myreg.test(mobile)) {
    return false;
  } else {
    return true
  }
}

export function isMobilePasswd(passwd) {
  var myreg = /\d{4,6}$/;
  if (!myreg.test(passwd)) {
    return false;
  } else {
    return true
  }
}

// 验证密码
export function isPassword(pass) {
  /**
   * //密码长度限定 if (str.length < 6 || str.length > 10){ return false; }
   * //中英文混合密码验证
   * if(!str.match(/[0-9]/)||!(str.match(/[a-zA-Z]/)||/\W/.test(str))){ return
   * false; }
   */
  var val = pass;
  if (!val || val.length < 6) {
    return false
  }
  return true;
}

export function isEmail(email) {
  var reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (reg.test(email)) {
    return true;
  } else {
    return false;
  }
}

export function isIdCard(pId) {
  // 检查身份证号码
  pId = pId.toLowerCase();
  var arrVerifyCode = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2];
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

  // if(pId.length != 15 && pId.length != 18) return false;
  if (pId.length == 15 || pId.length != 18)
    return false;

  var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19" +
    pId.slice(6, 16);

  if (!/^\d+$/.test(Ai))
    return false;

  var yyyy = Ai.slice(6, 10),
    mm = Ai.slice(10, 12) - 1,
    dd = Ai
    .slice(12, 14);

  var d = new Date(yyyy, mm, dd),
    now = new Date();
  var year = d.getFullYear(),
    mon = d.getMonth(),
    day = d.getDate();

  if (year != yyyy || mon != mm || day != dd || d > now)
    return false;

  for (var i = 0, ret = 0; i < 17; i++)
    ret += Ai.charAt(i) * Wi[i];
  Ai += arrVerifyCode[ret %= 11];

  return pId.length == 18 && pId != Ai ? false : true;

}


function getEffectiveAge(strBirthday, policyDate) {
  //参数一：被保险人的生日
  //参数二：起保日期
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var policyDateArr = policyDate.split("-");
  var policyYear = policyDateArr[0];
  var policyMonth = policyDateArr[1];
  var policyDay = policyDateArr[2];

  if (policyYear == birthYear) {
    returnAge = 0; //同年 则为0岁
  } else {
    var ageDiff = policyYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (policyMonth == birthMonth) {
        var dayDiff = policyDay - birthDay; //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = policyMonth - birthMonth; //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge; //返回周岁年龄
}

//年龄校验
//参数一：被保险人年龄：1953-11-23
//参数二：校验基准时间：2019-11-19：也就是投保时间
//参数三四：校验范围：16=<年龄<=65      过65周岁生日那天还是可以的，过了之后就不行了

// 1954-11-19 false 65周岁多一天
// 1954-11-20 true  刚好65周岁
// 1954-11-21 true  64周岁
export function AgeCheck(InsurdAge, standTime,minAge,maxAge) {
  //月份
  let Imouth = parseInt(InsurdAge.split("-")[1]);
  let Smouth = parseInt(standTime.split("-")[1]);
  //日期
  let Idata = parseInt(InsurdAge.split("-")[2]);
  let Sdata = parseInt(standTime.split("-")[2]);
  let trueAge = parseInt(getEffectiveAge(InsurdAge, standTime));
  if (trueAge < minAge || trueAge > maxAge) {
    return false;
  } else if (trueAge == maxAge) {
    if (Imouth < Smouth) {
      return false
    } else if (Imouth == Smouth) {
      if (Idata > Sdata || Idata == Sdata) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  } else {
    return true;
  }
}

// 投保人 输入身份证号
export function getMoreInfoHolder(holderCertificateType, holderCertificateNo, holderBirth) {
  if ($("#holderCertificateType").val() == "身份证") {
    var idVal = $(".holderCertificateNo").val();
    var tBirth_y = idVal.substring(6, 10);
    var tBirth_m = idVal.substring(10, 12);
    var tBirth_d = idVal.substring(12, 14);
    var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
    $("#holderBirth").val(tBirth);
    // 性别
    if (idVal.length == 18) {
      var sex = idVal.charAt(16);
      if (sex % 2 != 0) {
        $(".holderSex input[value=男]").click();
        layui.form.render();
      } else {
        $(".holderSex input[value=女]").click();
        layui.form.render();
      }
    } else {
      //    alert('身份证非18位证件号码')
    }
  }
}
// 被保险人 输入身份证号
export function getMoreInfoInserd() {
  if ($("#insuredCertificateType").val() == "身份证") {
    var idVal = $("#insuredCertificateNo").val();
    var tBirth_y = idVal.substring(6, 10);
    var tBirth_m = idVal.substring(10, 12);
    var tBirth_d = idVal.substring(12, 14);
    var tBirth = tBirth_y + "-" + tBirth_m + "-" + tBirth_d;
    $("#insuredBirth").val(tBirth);
    // 性别
    if (idVal.length == 18) {
      var sex = idVal.charAt(16);
      if (sex % 2 == 0) {
        $(".insuredSex")
          .find("input[title=女]")
          .click();
      } else {
        $(".insuredSex")
          .find("input[title=男]")
          .click();
      }
      layui.use("form", function () {
        var form = layui.form;
        form.render();
      });
    } else {
      //    alert('身份证非18位证件号码')
    }
  }
}

/**
 * 
 * @param {*} CertificateType 证件类型
 * @param {*} lockSexDom 锁定的性别DOM
 * @param {*} callback 锁定性别之后，根据身份证号渲染性别
 */
export function CertificateTypeLockSex(CertificateType, lockSexDom,callback){
  // 判断身份证回调类型为身份证的时候，性别锁死不能修改
  if (CertificateType == "身份证") {
    lockSexDom.css('pointer-events', 'none');
    if (callback) {
      callback();
    }
  } else {
    lockSexDom.css('pointer-events', 'all');
  }
}


/**
 * 
 * @param {*} res  // 选择常用联系人信息
 * @param {*} person  // 选择投保人还是被保人
 * @param {*} inserdIndex  // 选择的被保人 要传入第几个被保人 进行赋值
 * @param {*} filterDom  // 过滤掉的字段 不进行赋值
 * @param {*} callback  // 选择常用联系人之后执行的回调
 */
export function SelectContacts(res, person, inserdIndex,filterDom, callback) {
  if (person == 'tbr') {
    // 投保人姓名
    if ($('input[name=holderName]').length != 0 && filterDom != 'holderName') {
      $('input[name=holderName]').val(res.fcName);
    }
    // 投保人手机号
    if ($('input[name=holderPhone]').length != 0 && filterDom != 'holderPhone') {
      $('input[name=holderPhone]').val(res.fcPhone);
    }
    // 投保人证件类型
    if ($('input[name=holderCertificateType]').length != 0 && filterDom != 'holderCertificateType') {
      $('input[name=holderCertificateType]').val(res.fcCertificateType);
      // 投保人证件类型为身份证时，联系人姓名默认投保人姓名
      if ($('input[name=holderCertificateType]').val() == '身份证'){
        $('input[name=linkManName]').val($('input[name=holderName]').val());
      }
    }
    // 投保人证件号
    if ($('input[name=holderCertificateNo]').length != 0 && filterDom != 'holderCertificateNo') {
      $('input[name=holderCertificateNo]').val(res.fcCertificateNo);
    }
    // 投保人性别
    if ($('.holderSex').length != 0 && filterDom != 'holderSex') {
      if (res.fcSex == '男') {
        $('.holderSex input[title=男]').prop('checked', 'checked');
      } else if (res.fcSex == '女') {
        $('.holderSex input[title=女]').prop('checked', 'checked');
      }
      layui.use("form", function () {
        var form = layui.form;
        form.render();
      });
    }
    if ($('input[name=holderBirth]').length != 0 && filterDom != 'holderBirth') {
      $('input[name=holderBirth]').val(res.fcBirth.split(' ')[0]);
    }
    // 投保人邮箱
    if ($('input[name=holderMailbox]').length != 0 && filterDom != 'holderMailbox') {
      $('input[name=holderMailbox]').val(res.fcMailbox);
    }
    // 投保人详细地址
    if ($('input[name=holderAddress]').length != 0 && filterDom != 'holderAddress') {
      $('input[name=holderAddress]').val(res.fcAddress);
    }
    // 根据证件类型锁定性别
    CertificateTypeLockSex($('#holderCertificateType').val(), $(".holderSex"));
  } else if (person == 'bbr') {
    // 被保险人姓名
    if ($('input[name=insuredName]').length != 0 && filterDom != 'insuredName') {
      $('input[name=insuredName]').eq(inserdIndex).val(res.fcName);
    }
    // 被保险人手机号
    if ($('input[name=insuredPhone]').length != 0 && filterDom != 'insuredPhone') {
      $('input[name=insuredPhone]').eq(inserdIndex).val(res.fcPhone);
    }
    // 被保险人证件类型
    if ($('input[name=insuredCertificateType]').length != 0 && filterDom != 'insuredCertificateType') {
      $('input[name=insuredCertificateType]').eq(inserdIndex).val(res.fcCertificateType);
    }
    // 被保险人证件号
    if ($('input[name=insuredCertificateNo]').length != 0 && filterDom != 'insuredCertificateNo') {
      $('input[name=insuredCertificateNo]').eq(inserdIndex).val(res.fcCertificateNo);
    }
    // 被保险人性别
    if ($('.insuredSex').eq(inserdIndex).length != 0 && filterDom != 'insuredSex') {
      if (res.fcSex == "男") {
        $(".insuredSex")
          .eq(inserdIndex)
          .find("input[title=男]")
          .prop('checked', 'checked');
      } else if (res.fcSex == "女") {
        $(".insuredSex")
          .eq(inserdIndex)
          .find("input[title=女]")
          .prop('checked', 'checked');
      }
      layui.use("form", function () {
        var form = layui.form;
        form.render();
      });
    }
    if ($('input[name=insuredBirth]').length != 0 && filterDom != 'insuredBirth') {
      $('input[name=insuredBirth]').eq(inserdIndex).val(res.fcBirth.split(" ")[0]);
    }
    // 被保险人邮箱
    if ($('input[name=insuredMailbox]').length != 0  && filterDom != 'insuredMailbox') {
      $('input[name=insuredMailbox]').eq(inserdIndex).val(res.fcMailbox);
    }
    // 根据证件类型锁定性别
    CertificateTypeLockSex($('input[name=insuredCertificateType]').eq(inserdIndex).val(), $('.insuredSex').eq(inserdIndex));
  }

  if (callback){
    callback();
  }
}

// 根据身份证 获取年龄大小
export function GetAge(identityCard) {
  var len = (identityCard + "").length;
  if (len == 0) {
    return 0;
  } else {
    if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
    {
      return 0;
    }
  }
  var strBirthday = "";
  if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
  {
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
  }
  if (len == 15) {
    strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// 省接口
var title = ['省', '市', '区'];
export function queryProvince(id, id2, id3, callback) {
  api.querryProvince().then(res=>{
    if (res.success) {
      $(id).append("<option value=''>" + title[0] + "</option>");
      $(id2).append("<option value=''>" + title[1] + "</option>");
      $(id3).append("<option value=''>" + title[2] + "</option>");
      commonInfo(res.data, $(id), 0);
      if (callback) { callback(); }
    } else {
      alert("请进入修改信息页面重新维护所在地信息");
    }
  })
}
// 市接口
export function querryCity(code, id, id2, callback) {
  var code = code;
  // 传入id获取val
  if (typeof(code) == "string"){
    code = $(code).val();
  }
  if (isNaN(parseInt(code))) {
    $(id).html("<option value=''>" + title[1] + "</option>");
    $(id2).html("<option value=''>" + title[2] + "</option>");
    return;
  }
  
  api.querryCityByPro({ provinceCode: code}).then(res => {
    if (res.success) {
      $(id2).empty().append("<option value=''>" + title[2] + "</option>");
      commonInfo(res.data, $(id), 1);
      if (callback) { callback(); }
    } else {
      alert("请进入修改信息页面重新维护所在地信息");
    }
  })
}
// 区接口
export function querryArea(code, id, callback) {
  var code = code;
  // 传入id获取val
  if (typeof (code) == "string") {
    var code = $(code).val();
  }
  if (isNaN(parseInt(code))) {
    $(id).empty().append("<option value=''>" + title[2] + "</option>");
    return;
  }
  api.querryAreaByCity({ cityCode: code }).then(res => {
    if (res.success) {
      commonInfo(res.data, $(id), 2);
      if (callback) { callback(); }
    } else {
      alert("请进入修改信息页面重新维护所在地信息");
    }
  })
}
export function commonInfo(data, id, index) {
  var html = "";
  if (index == 0) {
    html += "<option value=''>" + title[0] + "</option>";
    $.each(data, function (idx, ele) {
      html += "<option value=" + ele.provinceCode + ">" + ele.province + "</option>";
    });
  }
  if (index == 1) {
    html += "<option value=''>" + title[1] + "</option>";
    $.each(data, function (idx, ele) {
      html += "<option value=" + ele.cityCode + ">" + ele.city + "</option>";
    });
  }
  if (index == 2) {
    html += "<option value=''>" + title[2] + "</option>";
    $.each(data, function (idx, ele) {
      html += "<option value=" + ele.areaCode + ">" + ele.area + "</option>";
    });
  }
  id.html(html);
}

 /*
strBirthday格式：2020-02-02
strBirthday: 出生日期(根据出生日期获取年龄大小，如果小于1岁返回天数) idDay:true 为小于1岁
*/
export function jsGetAge(strBirthday) {
  var isDay; //年龄小于0岁，返回天数为true
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    isDay = true;
    let diffDay = Math.floor((new Date().getTime() - new Date(birthYear + '/' + birthMonth + '/' + birthDay + " 00:00:00").getTime()) / (24 * 60 * 60 * 1000));
    returnAge = diffDay;
  } else {
    isDay = false;
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return {
    isDay: isDay,
    age: returnAge
  };//返回周岁年龄
}

/**
 * 根据出生年月获取年龄大小,小于0岁不返回天数
 * strBirthday格式：2020-02-02
 * @param {*} strBirthday 
 */
export function getFullAge(strBirthday) {
  var returnAge;
  var strBirthdayArr = strBirthday.split("-");
  var birthYear = strBirthdayArr[0];
  var birthMonth = strBirthdayArr[1];
  var birthDay = strBirthdayArr[2];

  var d = new Date();
  var nowYear = d.getFullYear();
  var nowMonth = d.getMonth() + 1;
  var nowDay = d.getDate();

  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0岁
  }
  else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        }
        else {
          returnAge = ageDiff;
        }
      }
      else {
        var monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        }
        else {
          returnAge = ageDiff;
        }
      }
    }
    else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge;//返回周岁年龄
}

// 时间戳转时间格式  blo为true，返回 yy-mm-dd 格式 不传为 yy-mm-dd h-m-s
export function timestampToTime(timestamp, blo) {
  if (timestamp) {
    var time = new Date(Number(timestamp));
    var y = time.getFullYear();
    var M = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    if (blo) {
      return y + '-' + addZero(M) + '-' + addZero(d)
    } else {
      return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
    }
  } else {
    return '';
  }
}
// 月份小于10 前面加上 0（01月）
function addZero(m) {
  return m < 10 ? '0' + m : m;
}

/**
 * 银行卡位数校验
 * @param {*} BankCode 银行卡号
 */
export function BankCodeVerify(BankCode) {
  const lastNum = +BankCode.substr(BankCode.length - 1, 1);
  const first15Num = BankCode.substr(0, BankCode.length - 1);
  const newArr = [];
  for (let i = first15Num.length - 1; i > -1; i -= 1) {
    newArr.push(first15Num.substr(i, 1));
  }
  const arrJiShu = [];
  const arrJiShu2 = [];
  const arrOuShu = [];
  for (let j = 0; j < newArr.length; j += 1) {
    if ((j + 1) % 2 === 1) {
      if (parseInt(newArr[j], 10) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j], 10) * 2);
      } else {
        arrJiShu2.push(parseInt(newArr[j], 10) * 2);
      }
    } else {
      arrOuShu.push(newArr[j]);
    }
  }

  const jishuChild1 = [];
  const jishuChild2 = [];
  for (let h = 0; h < arrJiShu2.length; h += 1) {
    jishuChild1.push(parseInt(arrJiShu2[h], 10) % 10);
    jishuChild2.push(parseInt(arrJiShu2[h], 10) / 10);
  }

  let sumJiShu = 0;
  let sumOuShu = 0;
  let sumJiShuChild1 = 0;
  let sumJiShuChild2 = 0;
  let sumTotal = 0;
  for (let m = 0; m < arrJiShu.length; m += 1) {
    sumJiShu += parseInt(arrJiShu[m], 10);
  }

  for (let n = 0; n < arrOuShu.length; n += 1) {
    sumOuShu += parseInt(arrOuShu[n], 10);
  }

  for (let p = 0; p < jishuChild1.length; p += 1) {
    sumJiShuChild1 += parseInt(jishuChild1[p], 10);
    sumJiShuChild2 += parseInt(jishuChild2[p], 10);
  }
  sumTotal = parseInt(sumJiShu, 10) + parseInt(sumOuShu, 10)
    + parseInt(sumJiShuChild1, 10) + parseInt(sumJiShuChild2, 10);
  const k = parseInt(sumTotal, 10) % 10 === 0 ? 10 : parseInt(sumTotal, 10) % 10;
  const luhn = 10 - k;
  if (lastNum === luhn) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断两个字符串数组内容是否相同,注意这个方法根据下标进行对比的
 * @param {数组一} array1
 * @param {数组二} array2
 */
export function isContained(array1, array2) {
  return array1.length == array2.length && array1.every(function (v, i) { return v === array2[i] });
}

/**
 * 判断两个字符串数组内容是否相同，这个方法不根据对应下标判断（比如 arr1 = [1,2] arr2 = [2,1] isContained1(arr1,arr2)=> true）该方法比较耗时
 * @param {*} array1 
 * @param {*} array2 
 */
export function isContained1(array1, array2){
  var status = true;
  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array2.length; j++) {
      if (array1[i] == array2[j]) {
        break;
      } else if ((array2.length - 1) == j) {
        console.log('循环最后一次未识别到相同数据');
        status = false;
      }
    }
  };
  return status;
}