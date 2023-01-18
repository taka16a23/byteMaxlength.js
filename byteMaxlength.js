/*
 * 半角=1,全角=2としてカウントし指定最大長の入力制限を行う
 *
 * ■ 必要パッケージ
 *   a23StringExtensions.js
 *
 * ■ 下記を必要パッケージの後に読み込むのみこと
 *   <script src="byteMaxlength"></script>
 *
 * ■ 監視したいinput要素に下記を実装すること
 *   ・classに"byteMaxlength"をセットすること
 *   ・maxlengthにバイト数(半角=1,全角=2)をセットすること
 *   例: <input type="text" class="byteMaxlength" maxlength="10">
 *
 * author: atami
 *
 */
class ByteMaxlength {
  // 監視対象特定用のクエリ
  static get QUERY() {return '.byteMaxlength';}

  // バイト数がオーバーした際の処理
  //   a_element: 対象要素
  //   a_maxlength: 最大長
  static onOverflowed(a_element, a_maxlength) {
    // 入力値
    let t_value = a_element.value;
    // 入力バイト数が指定最大値以上
    while(0 < t_value.length && a_maxlength < t_value.byteLength) {
      // 末尾の文字を消去
      t_value = t_value.substring(0, t_value.length - 1);
    }
    // 再セット
    a_element.value = t_value;
  }

  // インプットイベント処理
  // ev: inputEvent
  static handleInputMaxByteLength(ev) {
    // 最大値取得
    let t_maxLength = ev.currentTarget.getAttribute('maxlength');
    // 取得できない
    if(t_maxLength === null) {
      // 処理しない
      return;
    }
    // 最大値が0以下
    if(t_maxLength <= 0) {
      // 処理しない
      return;
    }
    // 入力文字が0以下
    if(ev.currentTarget.value.length <= 0) {
      // 処理しない
      return;
    }
    // 入力文字が最大値以下
    if(ev.currentTarget.value.byteLength <= t_maxLength) {
      // 処理しない
      return;
    }
    // バイト数がオーバーした際の処理
    ByteMaxlength.onOverflowed(ev.currentTarget, t_maxLength);
  }

  // 初期化処理
  static init() {
    // 要素を取得
    document.querySelectorAll(ByteMaxlength.QUERY).forEach(function(element) {
      // バインド
      element.addEventListener('input', ByteMaxlength.handleInputMaxByteLength);
    });
  }
}

// DOM読込後に初期化
document.addEventListener('DOMContentLoaded', ByteMaxlength.init);
