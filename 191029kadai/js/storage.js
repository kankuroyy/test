/**
 * LocalStorageから取得します。
 * @param {string} storageKey localStorageのKey
 */
var getLocalStorage = function(storageKey){
	// JSON形式で返却
	return JSON.parse(localStorage.getItem(storageKey));
}

/**
 * LocalStorageに保存します。
 * @param {string} storageKey localStorageのKey
 * @prama {Object} data 保存するオブジェクト
 */
var setLocalStorage = function(storageKey,data){
	// JSON形式で保存
	var jsonData = JSON.stringify(data);
	localStorage.setItem(storageKey, jsonData);
}

/**
 * session情報を取得します。
 */
var getSessionStorage = function(){	
	var session = '';
	// localstorageに存在しない場合は空文字を返却。
	if(sessionStorage.getItem("sessionLogin") != null){
		console.log(sessionStorage.getItem("sessionLogin"));
		console.log(typeof sessionStorage.getItem("sessionLogin"))
		session = JSON.parse(sessionStorage.getItem("sessionLogin"));
	} 

	return session;
}

/**
 * sessionのログイン情報を保存します。
 * @prama {string} password 保存するpassword
 */
var setSessionStorage = function(sessionLogin){
	// JSON形式で保存
	var jsonData = JSON.stringify(sessionLogin);
	sessionStorage.setItem("sessionLogin", jsonData);
}

/**
 * storageKeyに紐づくデータをすべて削除します。
 * @param {string} storageKey localStorageのKey
 */
var deleteLocalStorage = function(storageKey){
	localStorage.removeItem(storageKey);
}


/**
 * menuリストを取得します。
 */
var getMenuList = function(){
	return getLocalStorage('menuList');
}

/**
 * menuリストを保存します。
 */ 
var setMenuList = function(data){
	setLocalStorage('menuList', data);
}

/**
 * 該当のmenuを削除します。
 */
var deleteMenu = function(key){
	// menuリストを取得
	var menuList = getMenuList();
	var updateMenuList = {};
	// keyに該当するデータを削除
	for(menu in menuList) {
		if(key != menu) {
			updateMenuList[menu] = menuList[menu];
		}
	}
	setMenuList(updateMenuList);
}

/**
 * menuリストを全て削除します。
 */
var deleteMenuList = function(){
	deleteLocalStorage('menuList');
}