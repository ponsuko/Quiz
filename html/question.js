const answersList = document.querySelectorAll('ol.answers li');

answersList.forEach(li => li.addEventListener('click', checkClickAnswer))

function checkClickAnswer(event) {
    // クリックされた答えの要素
    const clickedAnswerElement = event.currentTarget
    const selectedAnswer = clickedAnswerElement.dataset.answer;
    const questionId = clickedAnswerElement.closest('ol.answers').dataset.id;

    // フォームデータの入れ物を作る
    const formData = new FormData();

    // 送信したい値を追加
    formData.append('id', questionId);
    formData.append('selectedAnswer', selectedAnswer);

    // xhr = XMLHttpRequestの頭文字です
    const xhr = new XMLHttpRequest();

    // HTTPメソッドをPOSTに指定、送信するURLを指定
    xhr.open('POST', 'answer.php');

    // フォームデータを送信
    xhr.send(formData);

    xhr.addEventListener('loadend', function(event) {
        /** @type {XMLHttpRequest} */
        const xhr = event.currentTarget; 

        // リクエストが成功したかステータスコードで確認
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.response);

            const result = response.result;
            const correctAnswer = response.correctAnswer;
            const correctAnswerValue = response.correctAnswerValue;
            const explanation = response.explanation;

            displayResult(result, correctAnswer, correctAnswerValue, explanation);

        } else {
            alert('Error 回答データの取得に失敗しました');
        }
    });

}

function displayResult(result, correctAnswer, correctAnswerValue, explanation) {
    let message;
    let colorCode;

    if(result) {
        message = '正解です。すごいです';
        colorCode = '';
    } else {
        message = '不正解です。次は頑張りましょう';
        colorCode = 'red';
    }

    alert(message);

    // 正解の内容をHTMLに組み込む
    document.querySelector('span#correct-answer').innerHTML = correctAnswer + '. ' + correctAnswerValue;
    document.querySelector('span#explanation').innerHTML = explanation;

    document.querySelector('span#correct-answer').style.color = colorCode;
    document.querySelector('div#section-correct-answer').style.display = 'block';
}