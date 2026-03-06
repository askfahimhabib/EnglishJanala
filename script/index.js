const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
      .then((res) => res.json()) //promise of json
      .then((json) => displayLessons(json.data));
};


const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"))

}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
      .then((res) => res.json())
        .then((data) => {   
        removeActive()  
          const clickBtn = document.getElementById(`lesson-btn-${id}`);
          //   console.log(clickBtn);
          clickBtn.classList.add("active")
          displayLevelWord(data.data);
      });
    
}

const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `<div>
        <h2 class="text-2xl font-bold">${word.word} <i class="fa-solid fa-microphone-lines"></i> : <span class="font-bangla">${word.pronunciation}</span></h2>
      </div>
      <div>
        <h2 class="font-bold">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p></p>
      </div>
      <div>
        <h2 class="font-bold">Example</h2>
        <p class="font-bangla">${word.sentence}</p>
      </div>
      <div>
        <h2 class="font-bold font-bangla">সমার্থক শব্দগুলো</h2>
        <span class="btn"></span>
        <span class="btn"></span>
        <span class="btn"></span>
      </div>`;
    document.getElementById("word_modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-5">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <h2 class="font-bangla text-xl font-semibold text-gray-500">এই Lesson এ এখনো কোন ভোকাবুলারি যুক্ত করা হয় নি</h2>
        <h2 class="font-bangla text-3xl font-bold text-gray-800">নেক্সট Lesson এ যান</h2>
      </div>
        `;
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white text-center space-y-3 rounded-xl shadow-2xl p-8">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "No Word Found!"}</h2>
        <p class="text-gray-500 font-semibold">Meaning / Pronunciation</p>
        <div class="font-bangla font-bold">"${word.meaning ? word.meaning : "(অর্থ পাওয়া যায়নি)"} / ${word.pronunciation ? word.pronunciation : "(উচ্চারণ নেই)"}"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>   
        </div>
      </div>
        `;
        wordContainer.append(card);
    })
}

const displayLessons = (lessons) => {
    // 1.Get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2.get into every lesson
    for (let lesson of lessons) {
        // 3.create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>
            Lesson - ${lesson.level_no}</button>
        `;
        // 4.append into container
        levelContainer.append(btnDiv)
    }
        
}

loadLessons();