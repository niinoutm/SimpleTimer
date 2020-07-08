// テキスト
const TEXT_SET_BEAT_ANIMATION = "1s ease 0s infinite normal none running beat";
const TEXT_PLUS = "+";
const TEXT_MINUS = "-";
const TEXT_S = "s";

// クラステキスト
const CL_MINUS = "minus";
const CL_PLUS = "plus";
const CL_TD = "txt-deact";
const CL_TTD = "task-txt-deact";
const CL_VT = "valid-txt";
const CL_N = "none";

// カラークラスリスト
const CL_BD_LIST = ["cl-bd-0", "cl-bd-1", "cl-bd-2"];
const CL_LIST = ["cl-0", "cl-1", "cl-2"];

// タスクのリスト
var taskList = [];
// インターバル
var interval = 0;
// スコープ
var scope = 0;
// タスク数
var taskCount = 2;

// タイマー処理
var timer;

/** 初期処理 */
$(function() {});

/**
 * トグルボタンクリックイベント
 * @returns void
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
 * @returns void
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
        startTimer();
    }
}

/**
 * 入力チェック
 * @returns boolean result
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
    var isTask3 = !$("#taskText3").hasClass(CL_TTD);
    if (isTask3) {
        taskCount = 3;
    }
    if (isTask3
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
 * @returns void
 */
function setTimerInfo() {
    // インターバル設定
    resetTimerInfo();
    // タスク名設定
    $("#infoText").val(taskList[scope]);
    // サークル色設定
    $("#circleShadow").addClass(CL_BD_LIST[scope]);
    // カウントテキスト設定
    $("#circle").val(interval + TEXT_S);
    // サークルアニメーション設定
    $("#circleShadow").css("animation", TEXT_SET_BEAT_ANIMATION);
}

/**
 * タイマー情報をリセット
 * @returns void
 */
function resetTimerInfo() {
    // サークルアニメーションをクリア
    $("#circleShadow").css("animation", "");
    // インターバルクリア
    clearTimer();
}

/**
 * タイマー開始
 * @returns void
 */
function startTimer() {
    // インターバル
    timer = setInterval(function() {
        // カウント取得
        var count = $("#circle").val().split(TEXT_S)[0];
        // カウント減算
        count -= 1;
        // カウント設定
        $("#circle").val(count + TEXT_S);
        if (count == 0) {
            // カウントが0の場合
            // サークル色設定
            $("#circleShadow").removeClass(CL_BD_LIST[scope]);
            // カウント色設定
            $("#circle").removeClass(CL_LIST[scope]);
            // scope加算
            scope += 1;
            if (scope == taskCount) {
                // scopeがタスク数より多い場合scope初期化
                scope = 0;
            }
            // タスク名設定
            $("#infoText").val(taskList[scope]);
            // カウント設定
            $("#circle").val(interval + TEXT_S);
            // サークル色設定
            $("#circleShadow").addClass(CL_BD_LIST[scope]);
            // カウント色設定
            $("#circle").addClass(CL_LIST[scope]);
        }
    }, 1000);
}

/**
 * タイマークリア
 * @returns void
 */
function clearTimer() {
    clearInterval(timer);
}