  // DOM
  const contents:any = document.querySelectorAll("#mainv .content");
  const content:any = document.querySelector(".mainv-bottom > .content");
  const body:any = document.querySelector('body');
  const mainv:any = document.getElementById("mainv")
  const singleForm:any = document.getElementById('single-form');
  const contentTitle:any = document.querySelectorAll(".content .content-txt h3");
  const contentCategory:any = document.querySelectorAll(".content .category");
  const contentTxt:any = document.querySelectorAll(".content .body");
  const contentPosted:any = document.querySelectorAll(".content .posted");
  const createBtn:any = document.getElementById('create-btn');
  const createFormParent:any = document.querySelector('.create-form');
  const createBtnSp:any = document.querySelector('.create-btn_sp');
  const createBtnSpA:any = document.querySelector('a[href="create"]');
  const PcCategory:any = document.querySelector(".gnav a[href='/category/']");
  const PcMail:any = document.querySelector(".gnav a[href='/contact/']");
  const spCategory:any = document.querySelector(".gnav-sp a[href='category']");
  const spMail:any = document.querySelector(".gnav-sp a[href='mail']");
  const categoryHovSp:any = document.querySelector('.category-hov_sp');
  const categorys:any = document.querySelectorAll(".category-hov a");
  const categorysSp:any = document.querySelectorAll(".category-hov_sp a");
  const categoryPage:any = document.getElementById("category");
  const single:any = document.getElementById("single");
  const searchPage:any = document.getElementById("search");
  const search:any = document.querySelector('.search-inner input[name="search"]');
  let reports:any = localStorage.getItem("reports");
  let bodyHeight = body.offsetHeight - window.innerHeight;
  let prevBodyHeight = 0;


  // Pixabay API 設定
  const searchWord:string = 'research'; // 画像検索ワード
  const num:number = 200; // 画像表示枚数
  const pixabay = `https://pixabay.com/api/?key=22279897-0f6287b6e20f740b80680c404&q=${searchWord}&per_page=${num}`;
  
  async function callPixabayApi() {
    const res = await fetch(pixabay);
    const data = await res.json();
    const hits = data.hits
    const topImgs = document.querySelectorAll("#mainv img")
    topImgs.forEach( (e:any, i:number) => {
      topImgs[i].setAttribute('src', hits[i]["webformatURL"]);
    });
  }
  
  // 無限スクロールに関する処理
  window.addEventListener('scroll', function(){
    bodyHeight = body.offsetHeight - window.innerHeight;
    if((window.scrollY >= (body.offsetHeight - window.innerHeight)) && bodyHeight != prevBodyHeight) {
      prevBodyHeight = bodyHeight;
      let mainvBottom:any = document.querySelector(".mainv-bottom");
      for (let i = 0; i <= 10; i++) {
        const contentElement:any = document.createElement('div');
        contentElement.className = 'content';
        contentElement.innerHTML = '<a href="#" rel="tag"><div class="content-inner"><div class="content-img"><img src="" alt=""></div><div class="content-txt"><h3>タイトルが入ります。</h3><p class="category"></p><p class="body">テキストが入ります。テキストが入ります。テキストが入ります。</p><p class="posted"></p></div></div></a>';
        mainvBottom.appendChild(contentElement);
      }
      callPixabayApi();
    }
  });
  callPixabayApi();

// ページ遷移せずに移動
const Tosingle:any = (conts:any) => {
  Array.prototype.slice.call(conts).forEach( (cont:any, i:number) => {
    cont.addEventListener('click', ()=> {
      const contentsImg:any = document.querySelectorAll(".content img");
      const contentTitle:any = document.querySelectorAll(".content .content-txt h3");
      const contentTxt:any = document.querySelectorAll(".content .content-txt .body");
      const singleImg:any =  document.querySelector(".single-img img");
      const singleTitle:any =  document.querySelector(".single-txt h2");
      const singleTxt:any =  document.querySelector(".single-txt p");
  
      if ( mainv.classList.contains('active') ) {
        mainv.classList.toggle('active');
        single.classList.toggle('active');
      } else if ( categoryPage.classList.contains('active') ) {
        categoryPage.classList.toggle('active');
        single.classList.toggle('active');
      } else {
        searchPage.classList.toggle('active');
        single.classList.toggle('active');
      }
    
      singleImg.setAttribute('src', contentsImg[i].getAttribute('src'));
      singleTitle.textContent = contentTitle[i].textContent;
      singleTxt.textContent = contentTxt[i].textContent;
      console.log('clicked!');
    })
  }); 
};

Tosingle(contents);


  // チャット送信機能簡易版

  singleForm.addEventListener('submit', (e:any)=> {
    e.preventDefault();
    const singleFormTxt:any = document.getElementById('single-form-txt');
    const p:any = document.createElement('p');
    const span:any = document.createElement('span');
    const textArea:any = document.getElementById('text-area');
    p.appendChild(span);
    span.textContent = singleFormTxt.value;
    textArea.appendChild(p);
    singleFormTxt.value = '';
    var elm = document.documentElement;
    //scrollHeight ページの高さ clientHeight ブラウザの高さ
    var bottom = elm.scrollHeight - elm.clientHeight;
    //垂直方向へ移動
    window.scroll(0, bottom);
  })

  // ローカルストレージにセット
  const setStrage:any = (title:string, categoryList:any, body:string) => {
    const now:any = new Date();
    const posted:string = `${now.getYear()}-${now.getMonth()}-${now.getYear()} ${now.getHours()}:${now.getMinutes()}`;
    const month:string = now.getMonth();
    const date:string = now.getDate();
    const report: string[] = [ title || '何も入力されていません', category || 'その他', body || '何も入力されていません', posted ];
    if ( reports !== null && reports !== undefined ) {
      let noJsonReports:any = JSON.parse(reports);
      console.log(noJsonReports);
      console.log(reports);
      noJsonReports.reports.push(report);
      console.log(noJsonReports);
      console.log('push!');
      let setjson = JSON.stringify(noJsonReports);
      localStorage.setItem('reports', setjson);
      reports = localStorage.getItem("reports");
    } else {
      let noJsonReports:any = {
        "reports": [
          [ title || '何も入力されていません', categoryList || 'その他', body || '何も入力されていません', posted ],
        ]
      }
      console.log('no push!');
      let setjson = JSON.stringify(noJsonReports);
      localStorage.setItem('reports', setjson);
      reports = localStorage.getItem("reports"); 
      console.log(reports);
    }
    useStrage();
  }
  
  // ローカルストレージからDOM書き換え
  const useStrage:any = () => {
    if(reports !== null){
      let noJsonReports:any = JSON.parse(reports);
      console.log(noJsonReports);
      noJsonReports = noJsonReports.reports;
      noJsonReports.forEach((report:any, index:number) => {
        contentTitle[index].textContent = report[0]
        contentTxt[index].textContent = report[2]
        contentPosted[index].textContent = report[3]
        const categorys:any = report[1];
        // console.log(contentCategory.childNodes);
        if ( contentCategory.childNodes == undefined ) {
          if( typeof categorys == 'object' ) {
            categorys.forEach( (e:any) => {
              const span:any = document.createElement('span');
              span.textContent = e;
              contentCategory[index].appendChild(span);
            });
          } else {
            const span:any = document.createElement('span');
            span.textContent = categorys;
            contentCategory[index].appendChild(span);
          }
        }
      });
    }
  }

  useStrage();

  // カテゴリーボタンに関する挙動
  const category:any = ( categorys:any ) => {
    categorys.forEach((category:any, number:number) => {
      category.addEventListener('click', (e:any)=> {
        e.preventDefault();
        categoryPage.childNodes.forEach((e:any) => {
          e.remove();
        });
        if ( single.classList.contains('active') ) {
          single.classList.toggle('active');
        } else if ( searchPage.classList.contains('active') ) {
          searchPage.classList.toggle('active');
        }
        if(!categoryPage.classList.contains('active')){
          categoryPage.classList.add('active');
          mainv.classList.remove('active');
        }
        reports.forEach((report:any, i:number) => {
          const contentCategory:any = contents[i].childNodes[1].childNodes[1].childNodes[3].childNodes[3];
          console.log(contentCategory.textContent);
          if(contentCategory.textContent.indexOf(category.textContent) > -1){
            const contentCopy:any = contents[i].cloneNode(true);
            categoryPage.appendChild(contentCopy);
          }
          
        });
        const categoryContents:any = document.querySelectorAll("#category .content");
        Tosingle(categoryContents);
      })
  
    });
  }

  category(categorys); // PC
  category(categorysSp); // SP

contentCategory.forEach((e:any) => {
  if(e.textContent == ' '){
    e.remove();
  }
});

// 検索機能
search.addEventListener('input', (e:any) => {
  searchPage.childNodes.forEach((e:any) => {
    e.remove();
  });
  if ( single.classList.contains('active') ) {
    single.classList.toggle('active');
  } else if ( categoryPage.classList.contains('active') ) {
    categoryPage.classList.toggle('active');
  }
  if(!searchPage.classList.contains('active')){
    searchPage.classList.add('active');
    mainv.classList.remove('active');
  }
  Array.prototype.slice.call(contents).forEach( (content:any, i:number) => {
    if(content.textContent.indexOf(e.target.value) > -1){
      const contentCopy:any = contents[i].cloneNode(true);
      searchPage.appendChild(contentCopy);
    }
  });
  if ( e.target.value == '' ) {
    mainv.classList.toggle('active');
    searchPage.classList.toggle('active');
  }
  const searchContents:any = document.querySelectorAll("#search .content");
  Tosingle(searchContents);
})


createBtn.addEventListener('click', ()=> {
  createFormParent.classList.toggle('active');
  createBtn.classList.toggle('active');
})

createBtnSp.addEventListener('click', ()=> {
  createFormParent.classList.toggle('active');
  createBtn.classList.toggle('active');
})

// 画面遷移阻止
const preventList:Array<any> = [createBtnSpA, spCategory, spMail, PcCategory, PcMail];
preventList.forEach((i:any) => {
  i.addEventListener('click', (e:any)=>{
    e.preventDefault();
  })
});

spCategory.addEventListener('click', (e:any)=> {
  categoryHovSp.classList.toggle('active');
});


// レポート作成
  const createFormBtn:any = document.getElementById('create-form__btn');
  createFormBtn.addEventListener('click', (e:any)=> {
    e.preventDefault();
    const title:any = document.querySelector("input[name='title']");
    const categorys:any = document.querySelectorAll("input[name='category[]']");
    const body:any = document.querySelector("textarea[name='body']");
    const categoryList:any = [];
    categorys.forEach((e:any) => {
      if ( e.checked == true ) {
        categoryList.push(e.value);
      }
    });
    const url = '../app/app.php';
    const options = {
      method: 'POST',
      body: new URLSearchParams({
        title: title.value || '何も入力されていません',
        category: categoryList || 'その他',
        body: body.value || '何も入力されていません',
      }),
    }
    
    fetch(url, options);
    setStrage(title.value, categoryList, body.value);
  });
