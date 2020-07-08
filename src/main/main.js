
const SET_BEAT_ANIMATION = "1s ease 0s infinite normal none running beat";

const TEXT_PLUS = "+";
const TEXT_MINUS = "-";

const CL_MINUS = "minus";
const CL_PLUS = "plus";
const CL_TD = "txt-deact";
const CL_TTD = "task-txt-deact";
const CL_VT = "valid-txt";
const CL_N = "none";

var taskList = [];
var interval = 0;

/** 初期処理 */
$(function() {
});

/**
 * トグルボタンクリックイベント
 */
function tglClickEvent() {
    if ($("#tglBtn").hasClass(CL_PLUS)) {
        // トグルボタン"+"→"-"
        $("#tglBtn").removeClass(CL_PLUS);
        $("#tglBtn").val(TEXT_MINUS);
        $("#tglBtn").addClass(CL_MINUS);
        // 入力項目活性化
        $("#taskText3").removeClass(CL_TTD);
        $("#task3LABEL").removeClass(CL_TD);
        $("#taskText3").prop("readonly", false);
    } else {
        // トグルボタン"-"→"+"
        $("#tglBtn").removeClass(CL_MINUS);
        $("#tglBtn").val(TEXT_PLUS);
        $("#tglBtn").addClass(CL_PLUS);
        // 入力項目日活性化
        $("#taskText3").addClass(CL_TTD);
        $("#task3LABEL").addClass(CL_TD);
        $("#taskText3").removeClass(CL_VT);
        $("#taskText3").prop("readonly", true);
        // テキスト初期化
        $("#taskText3").val("");
    }
}

/**
 * セットボタンクリックイベント
 */
function setclickEvent() {
    // 入力チェック
    if (checkInput()) {
        // タスクのリストを作成
        taskList.push($("#taskText1").val());
        taskList.push($("#taskText2").val());
        taskList.push($("#taskText3").val());
        interval = Number($("#intervalText").val());
        // ダイアログ消去
        $("#dialogWindow").addClass(CL_N);
        // 入力情報セット
        setTimerInfo();
    }
}

/**
 * 入力チェック
 */
function checkInput() {
    // クラスリセット
    $("." + CL_VT).removeClass(CL_VT);
    var result = true;
    // タスク1
    if ($("#taskText1").val() == "") {
        $("#taskText1").addClass(CL_VT);
        result = false;
    }
    // タスク2
    if ($("#taskText2").val() == "") {
        $("#taskText2").addClass(CL_VT);
        result = false;
    }
    // タスク3(対象かどうかもチェック)
    if (!$("#taskText3").hasClass(CL_TTD)
        && $("#taskText3").val() == "" ) {
        $("#taskText3").addClass(CL_VT);
        result = false; 
    }
    // インターバル
    var intervalText = $("#intervalText").val();
    if (intervalText == "") {
        $("#intervalText").addClass(CL_VT);
        result = false;
    }
    // 数値(3桁以下)かどうか(1~999)
    if (isNaN(Number(intervalText))) {
        $("#intervalText").addClass(CL_VT);
        result = false;
    } else if (Number(intervalText) < 1
                || Number(intervalText) > 999) {
        $("#intervalText").addClass(CL_VT);
        result = false;
    }

    return result;
}

/**
 * タイマー情報をセット
 */
function setTimerInfo() {
}