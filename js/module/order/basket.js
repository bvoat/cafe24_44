$(function(){
    // 상품리스트 전체선택 기존 .on 을 .bind로 변경
    $('#product_select_all').bind('click', function() {
        var _status = $(this).data('status');

        $('[id^="basket_chk_id_"]').each(function(){
            var bChecked = $(this).is(":checked");

            if (_status == 'off') {
                if (bChecked === false) $(this).prop('checked', true);
            } else {
                $(this).prop('checked', false);
            }
        });

        $(this).data('status', _status == 'off' ? 'on' : 'off');
        fixedLayerPriceSet();
    });

    // 고정영역에 상품정보 세팅
    var fixedLayerPriceSet = function() {
        var iSumPrice = 0;
        var iCheckPrdCnt = 0;
        $('[id^="basket_chk_id_"]').each(function(){
            if ($(this).prop('checked') == true) {
                var sCheckId = $(this).attr('id');
                var aTemp = sCheckId.split('_');
                var iCheckId = aTemp[3];
                var iQuantity = $('#quantity_id_'+iCheckId).val();
                var iProductPrice = aBasketProductData[iCheckId].product_sum_price * iQuantity;
                iSumPrice = iSumPrice + iProductPrice;
                iCheckPrdCnt = iCheckPrdCnt + 1;
            }
        });
        if (iCheckPrdCnt > 0) {
            var sTotalPrice = SHOP_PRICE_FORMAT.toShopPrice(iSumPrice);
            $('#checked_order_count').html('<strong>' + sprintf(__('%s'),iCheckPrdCnt) + '</strong>' +'개 상품선택').css('padding-bottom','5px');
            $('#checked_order_price').html('결제예정금액 <strong><em><span id="checked_total_order_price">'+sTotalPrice+'</span></em></strong>').css('padding-bottom','5px');

            var sPriceRef = SHOP_PRICE_FORMAT.shopPriceToSubPrice(iSumPrice);
            if (sPriceRef != '') $('#checked_order_price').find('strong').append(sPriceRef);
        } else {
            fixLayerPriceRest();
        }
    };

    // 고정영역 상품합계초기화
    var fixLayerPriceRest = function() {
        $('#checked_order_count, #checked_order_price').html('').css('padding-bottom','0');
    };

    fixLayerPriceRest();

    // 장바구니 체크박스 체크시 상품총합계, 체크한 숫자 구하기 기존 .on 을 .bind로 변경
    $('[id^="basket_chk_id_"]').bind('click', function(e) {
        fixedLayerPriceSet();
    });
});

// 장바구니 선택상품 삭제
function selBasketDel(id) {
    $('[id^="'+BASKET_CHK_ID_PREFIX+'"]').prop('checked', false);
    $('[id="'+id+'"]').prop('checked', true);
    Basket.deleteBasket();
}

//장바구니 상품이 없을 때 전체선택 버튼 없애기

const product_select_all = document.querySelector("#product_select_all");
const order_list_check = document.querySelector(".order_list_check");

if(order_list_check != null){
    product_select_all.classList.add("displaynone");
}