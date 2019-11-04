// indexComponent
Vue.component('indexs', {
    template : 
        '<div class="contents">'+
          '<div class="today-menu">'+
            '<h5>今日の献立</h5>'+
          '</div>'+
          '<div class="recent-menu">'+
            '<h5>直近の献立</h5>'+
          '</div>'+
        '</div><!-- .contents -->',
    data: function () {
        return {
            todayMenu : "",
            recentMenu : ""
        }
    },
    methods: {
        
    },
    mounted: function(){
        this.todayMenu
    }
})

// listComponent
Vue.component('lists', {
    template : 
        '<div class="contents">'+
          '<div class="search-menu">'+
            '<span class="labels">ワード検索：</span><input type="text" v-model="searchWord"><br>'+
            '<span class="labels">ジャンル検索：</span><select v-model="genre">'+
              '<option v-for="genres in menuGenre">{{genres}}</option>'+
            '</select>'+
          '</div>'+
          '<div class="menu-list">'+
            '<h5>メニューリスト</h5>'+
            '<div v-if="!listDispFlag" class="tac">'+
              '<h3>該当する献立がありません。</h3>'+
              '<router-link tag="button" to="/regist" class="submit">献立を登録する</router-link>'+
            '</div>'+
            '<table class="menu-list-table" v-if="listDispFlag">'+
              '<thead>'+
                '<tr>'+
                  '<th></th>'+
                  '<th>献立名<span @click="desc(nameFlag)">▲</span><span @click="asc(nameFlag)">▼</span></th>'+
                  '<th>ジャンル<span @click="desc(genreFlag)">▲</span><span @click="asc(genreFlag)">▼</span></th>'+
                  '<th>日付<span @click="desc(dateFlag)">▲</span><span @click="asc(dateFlag)">▼</span></th>'+
                '</tr>'+
              '</thead>'+
              '<tbody>'+
                '<tr v-for="menu in menuList">'+
                  '<td>'+
                    '<button @click="deletMenu(menu.name)" class="submit">削除</button>'+
                    '<button @click="updateMenu(menu.name)" class="submit">編集</button>'+
                  '</td>'+
                  '<td><a @click="getDateList(menu.name)" class="menu-name">{{menu.name}}</a></td>'+
                  '<td>{{menu.genre}}</td>'+
                  '<td>{{menu.latestDate}}</td>'+
                '</tr>'+
              '</tbody>'+
            '</table>'+
            '<div>'+
              '<button class="submit tac" @click="deleteAll()" v-if="listDispFlag">全削除</button>'+
            '</div>'+
          '</div>'+
        '</div><!-- .contents -->',
    data: function () {
        return {
            menuList : {},
            menuGenre : [],
            genre : MENU_GENRE.ALL,
            listDispFlag : true,
            searchWord : '',
            nameFlag : 'name',
            genreFlag : 'genre',
            dateFlag : 'date',
        }
    },
    methods: {
        deletMenu : function(key) {
            console.log('[STRAT]deleteMenu with ' + key);
            var isDelete = confirm('献立を削除します。よろしいですか？');
            if(isDelete) {
                deleteMenu(key);
            }
            this.menuList = getMenuList();
            console.log('[END]deleteMenu with ' + key);
        },
        updateMenu : function(key) {
            console.log('[STRAT]updateMenu with ' + key);
            this.$router.push({path : 'regist' , query : { keyName : key}});
            console.log('[END]updateMenu with ' + key);
        },
        getDateList : function(key) {
            console.log('[STRAT]getDateList with ' + key);
            var dateList = this.menuList[key].date;
            var dateStr = ""
            for(index in dateList) {
                dateStr = dateStr + dateList[index] + "\n"
            }
            alert(key + 'を使用したのは以下の日程です。\n' + dateStr);
            console.log('[END]getDateList with ' + key);
        },
        deleteAll : function() {
            console.log('[STRAT]deleteAll.');
            var isDeleteAll = confirm('献立全てを削除します。よろしいですか？');
            if(isDeleteAll) {
                deleteMenuList();
            }
            this.menuList = {};
            console.log('[END]deleteAll.');
        },
        desc : function(flag){
            console.log('[START]desc sort.')
            this.menuList = {};
            var list = getMenuList();
            var copyMenuList = [];
            for(menu in list) {
                copyMenuList.push(list[menu]);
            }

            if(flag == 'name') {
                copyMenuList.sort(function(a,b) {
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                })
            } else if (flag == 'genre') {
                copyMenuList.sort(function(a,b) {
                    if(a.genre > b.genre) return -1;
                    if(a.genre < b.genre) return 1;
                    return 0;
                })
            } else if (flag == 'date') {
                copyMenuList.sort(function(a,b) {
                    if(a.latestDate > b.latestDate) return -1;
                    if(a.latestDate < b.latestDate) return 1;
                    return 0;
                })
            }
            for(detail in copyMenuList) {
                this.menuList[copyMenuList[detail].name] = copyMenuList[detail];
            }
            console.log('[END]desc sort.')
        },
        asc : function(flag){
            console.log('[START]desc sort.')
            this.menuList = {};
            var list = getMenuList();
            var copyMenuList = [];
            for(menu in list) {
                copyMenuList.push(list[menu]);
            }

            if(flag == 'name') {
                copyMenuList.sort(function(a,b) {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                    return 0;
                })
            } else if (flag == 'genre') {
                copyMenuList.sort(function(a,b) {
                    if(a.genre < b.genre) return -1;
                    if(a.genre > b.genre) return 1;
                    return 0;
                })
            } else if (flag == 'date') {
                copyMenuList.sort(function(a,b) {
                    if(a.latestDate < b.latestDate) return -1;
                    if(a.latestDate > b.latestDate) return 1;
                    return 0;
                })
            }
            for(detail in copyMenuList) {
                this.menuList[copyMenuList[detail].name] = copyMenuList[detail];
            }
            console.log('[END]desc sort.')
        }
    },
    mounted: function(){
        for(genre in MENU_GENRE) {
            this.menuGenre.push(MENU_GENRE[genre]);
        }
        this.menuList = getMenuList();
        if(this.menuList == null || Object.keys(this.menuList).length == 0){
            this.listDispFlag = false;
        } else {
            this.listDispFlag = true;
        }
    },
    watch : {
        /**
         * ジャンル変更ウォッチャー
         * @param val
         */
        genre : function(val) {
            console.log('[START]search menu genre.')
            this.menuList = {};
            var copyMenuList = getMenuList();
            if(val == MENU_GENRE.ALL) {
                this.menuList = copyMenuList;
            } else {
                for(key in copyMenuList) {
                    var menuDetail = copyMenuList[key];
                    if(this.genre == menuDetail['genre']) {
                        this.menuList[menuDetail['name']] = menuDetail;
                    }
                }
            }
            if(this.menuList == null || Object.keys(this.menuList).length == 0){
                this.listDispFlag = false;
            } else {
                this.listDispFlag = true;
            }
            console.log('[END]search menu genre.')
        },
        /**
         * 検索ワードウォッチャー
         */
        searchWord : function(val) {
            console.log('[START]search menu word.')
            this.menuList = {};
            var copyMenuList = getMenuList();
            if(val == '' || val.length == 0) {
                this.menuList = copyMenuList;
            } else {
                for(key in copyMenuList) {
                    var menuDetail = copyMenuList[key];
                    if(menuDetail['name'].indexOf(val) >= 0) {
                        this.menuList[menuDetail['name']] = menuDetail;
                    }
                }
            }
            if(this.menuList == null || Object.keys(this.menuList).length == 0){
                this.listDispFlag = false;
            } else {
                this.listDispFlag = true;
            }
            console.log('[END]search menu word.')
        }
    }
})

// registComponent
Vue.component('regists', {
    template : 
        '<div class="contents">'+
          '<h5>献立登録</h5>'+
          '<div class="regist-menu">'+  
              '<div class="menu-input-block">'+
                  '<p class="labels">献立名</p>'+
                  '<input type="text" v-model="menuName">'+
              '</div><!-- .menu-input-block -->'+
              '<div class="menu-input-block">'+
                  '<p class="labels">献立のジャンル</p>'+
                  '<select v-model="genre">'+
                      '<option v-for="genres in menuGenre">{{genres}}</option>'+
                  '</select>'+
              '</div><!-- .menu-input-block -->'+
              '<div class="menu-input-block">'+
                  '<p class="labels">献立を使った直近の日付</p>'+
                  '<input type="text" v-model="menuDate">'+
              '</div><!-- .menu-input-block -->'+
              '<button class="submit" @click="registMenu()">登録</button>'+
          '</div>'+
        '</div><!-- .contents -->',
    data: function () {
        return {
            menuName : this.$route.query.keyName,
            menuGenre : [],
            genre : REGIST_MENU_GENRE.MEAT,
            menuDate : ''
        }
    },
    methods: {
        registMenu : function() {
            if(this.menuName == '' || this.menuName == undefined || this.menuName == null) {
                alert('献立名を入力して下さい。');
                return;
            }            
            if(this.genre == '' || this.genre == undefined || this.genre == null) {
                alert('ジャンル名を正しく選択して下さい。');
                return;
            }            
            if(this.menuDate == '' || this.menuDate == undefined || this.menuDate == null) {
                alert('日付を入力して下さい。');
                return;
            }

            // 献立名の重複を確認
            var menuList = getMenuList();
            var menu = null;
            if(menuList != null) {
                menu = menuList[this.menuName];
            } else {
                menuList = {};
            }
            if(!menu){
                // 新規登録
                console.log('[START]regist new menu.');
                menuList[this.menuName] = {'name':this.menuName, 'genre':this.genre, 'date':[parseInt(this.menuDate)], 'latestDate':parseInt(this.menuDate)}
                setMenuList(menuList);
                alert('献立の登録を行いました。');
                console.log('[END]regist new menu.');
            } else {
                // 更新
                console.log('[START]update new menu.');
                var isUpdate = confirm('献立名:' + this.menuName + 'が既に存在します。更新してもよろしいですか？\n(※)最も新しい日付で表示されます。');
                var dateList = menu['date']
                for(i in dateList) {
                    if(dateList[i] == parseInt(this.menuDate)) {                      
                        alert('既に ' + this.menuDate + ' の日付で ' + this.menuName + ' に登録があります。日付を変えて登録して下さい。');
                        return;
                    }
                }

                dateList.push(parseInt(this.menuDate));
                // ソート
                dateList.sort(function(a,b){
                    if(a > b) return -1;
                    if(a < b) return 1;
                    return 0;
                });
                menu['date'] = dateList;
                menu['latestDate'] = dateList[0];
                menuList[this.menuName] = menu;
                setMenuList(menuList);
                alert('献立の更新を行いました。');
                console.log('[END]update new menu.');
            }
            this.$router.push({ path: 'list' })
        }
    },
    mounted: function(){
        for(genre in REGIST_MENU_GENRE) {
            this.menuGenre.push(MENU_GENRE[genre]);
        }

        var now = new Date();
        this.menuDate = now.getFullYear()+
          ( "0"+( now.getMonth()+1 ) ).slice(-2)+
          ( "0"+now.getDate() ).slice(-2);
    },
    watch : {
        /**
         * ジャンル変更ウォッチャー
         * @param val
         */
        genre : function(val) {
            console.log(val);
        }
    }
})

// prepareComponent
Vue.component('prepares', {

    template : 
        '<div class="contents">'+
          '<div class="prepare-box">'+
            '<h1 class="tac">準備中</h1>'+
          '</div>'+
        '</div><!-- .contents -->'
})