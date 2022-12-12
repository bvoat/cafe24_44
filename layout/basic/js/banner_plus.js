function makeBanner (bannerData, bannerListData, brUseBoolean) {
	var listTable = $('[js-banner-module="' + bannerData.br_call_id + '"] [js-banner]').parent();
	var childData = $('[js-banner-module="' + bannerData.br_call_id + '"] [js-banner]').clone().wrap('<div/>').parent().html();
	$('[js-banner-module="' + bannerData.br_call_id + '"] [js-banner]').remove();
  
	for (var i = 0; i < bannerListData.length; i++) {
	  var brLink = bannerListData[i].br_link == 'x' ? '' : bannerListData[i].br_link;
	  var brTarget = bannerListData[i].br_target == '0' ? '_self' : '_blank';
  
	  var replaceChildData = childData;
  
	  if (bannerListData[i].br_html && bannerListData[i].br_html != 'x') {
		replaceChildData = replaceChildData.replace(/{\$js-banner}/gi, bannerListData[i].br_html);
	  } else {
		replaceChildData = replaceChildData.replace(/{\$js-banner}/gi,'<img src="' + bannerListData[i].br_filename + '" alt="' + bannerListData[i].br_name + '">');
	  }
  
	  replaceChildData = replaceChildData.replace(/{\$js-href}/gi, brLink);
	  replaceChildData = replaceChildData.replace(/{\$js-target}/gi, brTarget);
	  replaceChildData = replaceChildData.replace(/{\$js-no}/gi, bannerListData[i].br_order);
	  replaceChildData = replaceChildData.replace(/{\$js-alt}/gi, bannerListData[i].br_name);
	  replaceChildData = replaceChildData.replace(/{\$js-html}/gi, bannerListData[i].br_html);
	  replaceChildData = replaceChildData.replace(/{\$js-src}/gi, bannerListData[i].br_filename);
	  replaceChildData = replaceChildData.replace(/{\$js-banner-description3}/gi, bannerListData[i].memo3);
	  replaceChildData = replaceChildData.replace(/{\$js-banner-description1}/gi, bannerListData[i].memo1);
	  replaceChildData = replaceChildData.replace(/{\$js-banner-description2}/gi, bannerListData[i].memo2);
	  $(listTable).append(replaceChildData);
	}
  
	if (!brUseBoolean) {
	  $('[js-banner-module="' + bannerData.br_call_id + '"]').attr('js-group-hide', true);
	}
  
	var aTagList = $('a');
  
	for (var i = 0; i < aTagList.length; i++) {
	  var hrefString = $(aTagList[i]).attr('href');
  
	  if (hrefString === '') {
		$(aTagList[i]).removeAttr('href');
	  }
	}
  }
  
  function getBannderData (mallId,  bannerData, brUseBoolean) {
	$.ajax({
	  type: 'GET',
	  async: false,
	  cache: false,
	  url: 'https://bannerplus.cafe24.com/banner/getAll.php?' + Math.random(),
	  data: { mall_id: mallId, br_listup: bannerData.br_listup, idx: bannerData.idx,  gr_idx: bannerData.gr_idx },
	  success: function success (returnData) {
		makeBanner(bannerData, JSON.parse(returnData), brUseBoolean);
	  }
	});
  }
  
  function loadDataSuccess (data, mallId) {
	for (var i = 0; i < data.length; i++) {
	  const brUseBoolean = !!(data[i].br_use === 'y' || data[i].br_use === 'Y');
  
	  if ($('[js-banner-module="' + data[i].br_call_id + '"]').html()) {
		var bannerName = data[i].br_name;
		var bannerMemo = data[i].br_memo;
		$('[js-banner-module="' + data[i].br_call_id + '"]').each(function (index, value) {
		  var data = $(value).clone().wrap('<div/>').parent().html();
		  data = data.replace(/%7B/gi, '{');
		  data = data.replace(/%7D/gi, '}');
		  data = data.replace(/%24/gi, '$');
		  data = data.replace(/{\$js-group-title}/gi, bannerName);
		  data = data.replace(/{\$js-group-description}/gi, bannerMemo);
		  $(value).replaceWith(data);
		});
  
		getBannderData(mallId, data[i], brUseBoolean);
	  }
	}
  
  
	setTimeout(() => {
	  $('[js-banner-module]').removeAttr('js-hide');
	}, 300);
	return false;
  }
  
  function loadData (scriptNo) {
	$.ajax({
	  type: 'POST',
	  async: false,
	  cache: false,
	  data: { script_no: scriptNo },
	  url: 'https://bannerplus.cafe24.com/group/getAll.php?' + Math.random(),
	  success: function success (data) {
		var returnData = JSON.parse(data);
		loadDataSuccess(returnData.data, returnData.mallId);
		return false;
	  },
	});
  }
  
  (function(){
	var scriptArray = [];
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
	  var idx = scripts[i].src.indexOf('/web/upload/appfiles');
  
	  if (idx !== -1) {
		scriptArray.push(scripts[i].src.split('/web/upload/appfiles/')[1]);
	  }
	}
  
	return loadData(scriptArray);
  }());