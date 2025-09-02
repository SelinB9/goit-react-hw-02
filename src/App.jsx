import React, { useEffect, useState } from 'react';
import Feedback from './Feedback';
import Options from './Options';  
import Notification from './Notification';

function App() {
// Başlangıç state'i: localStorage'dan oku, yoksa sıfırlarla başlat
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedbackData");
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedbackData",JSON.stringify(feedback));
  }, [feedback]);


  const updateFeedback = feedbackType => {// Burada durumu güncellemek için setter'ı kullan
    setFeedback(prev => ({
      ...prev,//önceki tüm değerler demek  ...prev operatörü önceki sayıları almaya yarar,sadece tıklanan türü artırmak için kullanırız. prev içinde tüm key-value çiftlerini kopyalar.
      [feedbackType]: prev[feedbackType] + 1
    }));
  }
  
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  }

  const percentagePositive = totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;


    
    return (
      <div >
        <h1>Sip Happens Café</h1>
        <p>Please leave your feedback about our service by selecting one of the options below.</p>
    
        <Options
          updateFeedback={updateFeedback}
          resetFeedback={resetFeedback} 
          totalFeedback={totalFeedback}
        />
        {/* 2️ Koşullu render ternary kullandık */}
        {totalFeedback > 0 ? (
          <Feedback
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={totalFeedback}
            positive={percentagePositive}
           
          

          />) :
          (<Notification />
          )}
    
      </div>
 
    );
  };
  
 

{/*prev = önceki state
...prev = diğer değerleri koru 
[feedbackType]: prev[feedbackType]+1 = sadece tıklanan değeri artır 

Görevin en son kısmı sayfa yenilendiğinde tıklanan veriler kaybolmasın local stroagede saklansın.
sayfa yeniden yüklendiğindede local storage i kullanıp verileri göstersin veri yoksa yerel depoda
direkt 0 alsın.Bunu useeffect ile yapacağız işte 
JSON.parse(saved)
localStorage sadece string saklar, biz JavaScript objesi ile çalışmak istiyoruz.
JSON.parse stringi objeye çevirir.*/}




export default App;