'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**  (jsドック)
 * 指定した要素の子供を全消し
 * @param　{HTMLElement}　element HTMLの要素
*/
//すでにある診断結果を削除する
function removeAllChildren(element){ //すでにある診断結果を削除する
　　while(element.firstChild){ //result-areaに何かタグがあればループする
    　　element.removeChild(element.firstChild); //この要素がある限り削除
    } 
}

/**
 * 指定した要素に診断結果用のタグを設定する
 */
function appendAssessmentResult(element,result){

 //result-areaに　h3"診断結果"という文字を表示
 const h3 = document.createElement('h3'　);  　//h3タグを作る
 h3.innerText = '診断結果';    //タグに文字をいれる
 element.appendChild(h3);    //result-areaにh３の変数を設定

 //pタグで診断結果を表示
 const p = document.createElement('p');　　//pタグを作る
 p.innerText = result;　　//タグに文章をいれる
 element.appendChild(p);　

}

userNameInput.onkeydown = event => {
  if (event.key === 'Enter'){
    assessmentButton.onclick();
  　}
};

assessmentButton.onclick = function () {　　　
  let userName = userNameInput.value;
  if(!userName) {          // 名前が入力されない時
  return;   　// 処理終了
　};

//診断結果の表示　
 removeAllChildren(resultDivided);　　　//診断結果の初期化
　const result = assessment(userName);
 appendAssessmentResult(resultDivided,result);

//Tweetボタンの表示
  removeAllChildren(tweetDivided);　　　//ツイートエリアの初期化　　

  const a = document.createElement('a');
  const href = 'https://twitter.com/intent/tweet?button_hashtag='
   + encodeURIComponent('あなたのいいところ')+ '&ref_src=twsrc%5Etfw';
  a.setAttribute('href',href);
  a.setAttribute('class','twitter-hashtag-button');
  a.setAttribute('data-text',result);
  a.innerText = 'Tweet #あなたのいいところ';

  tweetDivided.appendChild(a);     //aタグをHTMLで追加する

  const script = document.createElement('script');    //sprictタグを作る
  script.setAttribute('src','https://platform.twitter.com/widgets.js');

  tweetDivided.appendChild(script);     //sprictタグをHTMLに追加する
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @returns {string} 診断結果
 */

function assessment(userName){
      // TODO 診断処理を書く
      let userNameNumber = 0;
    for (let i = 0; i < userName.length; i++ ) {
        userNameNumber += userName.charCodeAt(i);
    }
    let answerNumber = userNameNumber % answers.length; //16個に振り分けたい
    let result = answers[answerNumber];
    
    return result.replace(/\{userName\}/g, userName);//userNameを置換
           //診断結果
}
//テストコード
console.assert(
    assessment('太郎') ===
     '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );