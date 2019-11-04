// headerComponent
Vue.component('headers', {

    template : 
        '<div class="header">'+
        '<div class="header-navi">'+
            '<ul>'+
                '<router-link class="header-navi-li" tag="li" id="index" to="/">ホーム</router-link>'+
                '<router-link class="header-navi-li" tag="li" id="list" to="/list">献立リスト</router-link>'+
                '<router-link class="header-navi-li" tag="li" id="regist" :to="{ path: \'regist\', query: { keyName: keyName }}">献立登録</router-link>'+
            '</ul>'+
        '</div>'+
        '</div>',
    data: function () {
        return {
            keyName : ''
        }
    }
})

// footerComponent
Vue.component('footers', {
    template : 
        '<div class="footer">'+
            '<div class="copyright">Copyright © りっちゃんの献立 All Rights Reserved.</div><!-- .copyright -->'+
        '</div>'
})