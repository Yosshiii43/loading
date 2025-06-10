const loadingWrap = document.querySelector('.js-loadingWrap');
const contents    = document.querySelector('.c-wrapper');

//コンテンツを表示する関数
function showContents() {
  contents.classList.remove('is-hidden');
}

// ローディングを停止する関数
function loadingStop() {
  loadingWrap.classList.add('is-fadeout');

  // アニメーションが終わったタイミングで実行
  loadingWrap.addEventListener('animationend', () => {
    loadingWrap.style.display = 'none';
  }, { once: true });            // once:true で 1 回きり
}

/* 初回かどうか判定 -------------------------------------------- */
  if (!sessionStorage.getItem('isFirstLoad')) {
    //初回
    sessionStorage.setItem('isFirstLoad', 'true');
    window.addEventListener('load', () => {
      loadingStop();                        // フェードアウト開始
      showContents();                       // ロード完了後に本体を表示
  });
  } else {
    // 初回以外の場合、ローディング画面を非表示にする
    loadingWrap.style.display = 'none';      //loadingWrapを即座に消す
    showContents();                          // 本体をすぐ表示
  }