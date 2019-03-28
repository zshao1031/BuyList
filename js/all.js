//========================================
//變數
var item_Html = "<li class='buyItem'><div class='item_Name'>{{item_Num}}.{{item_Name}}</div><div class='item_Price'>{{item_Price}} $</div><div id='{{remove_ItemId}}' data-RemoveId='{{data_RemoveId}}' class='delete_Button'>X</div></li>";
var total_Price = 0;

//========================================
//資料物件
var data_Url = "https://awiclass.monoame.com/api/command.php?type=get&name=itemdata";
var shopList = {};
shopList.name = "MyBuyList 購物清單";
shopList.time = "2019/3/26";

//預設的本機端資料
shopList.list = [
    {"name": "吹風機", "price": 300},
    {"name": "麥克筆", "price": 9000},
    {"name": "筆記型電腦", "price": 54555},
    {"name": "Iphone9", "price": 32000},
    {"name": "神奇海螺", "price": 5000},
];

//========================================
//取得URL的資料，並且生成清單
$.ajax(
    {
        url: data_Url,
        success: function(rgs)
        {
            //將抓到的資料rgs轉換成JSON格式存起來
            shopList.list = JSON.parse(rgs);

            //使用抓到的資料，生成購物清單
            generate_BuyList();
        },

        error: function()
        {          
            //直接使用本機端的資料，生成購物清單
            generate_BuyList();
        }
    }
);

//========================================
//等網頁全部載入後才會執行的程式碼(jQuery)
$(document).ready(function()
{    
    //按下「+新增」鈕後的動作
    $(".addItem").click(function()
    {
        shopList.list.push(
            {
                name: $("#input_Name").val(),
                price: $("#input_Price").val()
            }
        );
        
        //清除input欄位內的東西
        $("#input_Name").val("");
        $("#input_Price").val("");
        
        //重新生成購物清單
        generate_BuyList();

    });

    
    
});

//===========================================
//【其他function】

//生成購物清單用
function generate_BuyList()
{
    //清除舊的購物清單
    $("#items_List").html("");
    total_Price = 0;

    //抓data來自動產生購物清單內容
    for (var i=0; i<shopList.list.length; i++)
    {
        var item = shopList.list[i];
        var item_Id = "buyItem_" + i;
        var remove_ItemId = "removeItem_" + i;
        //計算總金額
        total_Price += parseInt(item.price);

        //將html部分內容取代為此筆資料的內容
        var current_Item_Html = 
            item_Html.replace("{{item_Id}}", item_Id )
                     .replace("{{item_Num}}", i+1)
                     .replace("{{item_Name}}", item.name)
                     .replace("{{item_Price}}", item.price)
                     .replace("{{remove_ItemId}}", remove_ItemId)
                     .replace("{{data_RemoveId}}", i)
                     ;

        //產生物品內容
        $("#items_List").append(current_Item_Html);

        //設定按X時可以刪除該項購物資料
        $("#"+ remove_ItemId).click(function()
        {
            remove_Item(parseInt($(this).attr("data-RemoveId")));
        });
    }

    //更新總價的數字
    $("#total_Price").text(total_Price + " $");
};

//刪除資料用
function remove_Item(remove_Id)
{
    console.log(remove_Id);
    shopList.list.splice(remove_Id, 1);
    generate_BuyList();
};


//等網頁全部載入後才會執行的程式碼(JavaScript)
/*
window.onload = function () { 
	
}
*/



    

