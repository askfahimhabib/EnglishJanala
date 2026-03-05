const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
      .then((res) => res.json()) //promise of json
      .then((json) => displayLessons(json.data));
};
loadLessons()

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayLevelWord(data.data));
    
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

        //     {
        //     "id": 79,
        //     "level": 1,
        //     "word": "Jump",
        //     "meaning": "লাফানো",
        //     "pronunciation": "জাম্প"
        // }

    words.forEach(word => {
        console.log(word);

        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white text-center space-y-3 rounded-xl shadow-2xl p-8">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "No Word Found!"}</h2>
        <p class="text-gray-500 font-semibold">Meaning / Pronunciation</p>
        <div class="font-bangla font-bold">"${word.meaning ? word.meaning :"(অর্থ পাওয়া যায়নি)"} / ${word.pronunciation ? word.pronunciation : "(উচ্চারণ নেই)"}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
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
        console.log(lessons)
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i>
            Lesson - ${lesson.level_no}</button>
        `;
        // 4.append into container
        levelContainer.append(btnDiv)
    }
        
}