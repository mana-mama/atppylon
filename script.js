let menu = document.querySelector("#menu-bars");
let navbar = document.querySelector(".navbar");
let html = document.querySelector("html");

menu.onclick = () => {
    menu.classList.toggle("active");
    navbar.classList.toggle("active");
}

window.onscroll = () => {
    navbar.classList.remove("active");
}

let box_container = document.querySelector("#box-container");
let box = document.getElementById("0");
let header_bar = document.querySelector("header");
let top_button = document.getElementById("myBtn");
let sub = document.querySelector("input.sub");
let sub_s = document.querySelectorAll("input.sub-s");
let sub_c = document.querySelectorAll("input.sub-c");
let sub_t = document.querySelectorAll("input.sub-t");
let sub_b = document.querySelectorAll("input.sub-b");
let main_radio = document.querySelectorAll("input.main");
let cone_size_sort = [true, true, true, true, true, true, true, true]
let cone_color_sort = [true, true, true, true, true, true, true]
let cone_strap_sort = [true, true, true, true]
let cone_base_sort = [true, true]
let other_sort = true

function resetInfo() {
    main_radio[0].checked = true;
    main_radio[1].checked = true;
    main_radio[2].checked = true;
    main_radio[3].checked = true;
    main_radio[4].checked = true;
    for (i=0; i < cone_size_sort.length; i++) {
        cone_size_sort[i] = true;
        sub_s[i].checked = false;
    }
    for (i=0; i < cone_color_sort.length; i++) {
        cone_color_sort[i] = true;
        sub_c[i].checked = false;
    }
    for (i=0; i < cone_strap_sort.length; i++) {
        cone_strap_sort[i] = true;
        sub_t[i].checked = false;
    }
    for (i=0; i < cone_base_sort.length; i++) {
        cone_base_sort[i] = true;
        sub_b[i].checked = false;
    }
    
    sub.checked = false
    other_sort = true

    updateProductsList();
}

function radioClick(radiobox) {
    const index = parseInt(radiobox.id) - 1;

    if (index == 34) {
        main_radio[4].checked = false;
        sub.checked = true
        other_sort = false
    } else if (index == 33) {
        main_radio[4].checked = true;
        sub.checked = false
        other_sort = true
    } else if (index == 32) {
        main_radio[3].checked = true;
        for (i=0; i < sub_b.length; i++) {
            sub_b[i].checked = false
            cone_base_sort[i] = true
        }
    } else if (index == 31) {
        main_radio[2].checked = true;
        for (i=0; i < sub_t.length; i++) {
            sub_t[i].checked = false
            cone_strap_sort[i] = true
        }
    } else if (index == 30) {
        main_radio[1].checked = true;
        for (i=0; i < sub_c.length; i++) {
            sub_c[i].checked = false
            cone_color_sort[i] = true
        }
    } else if (index == 29) {
        main_radio[0].checked = true;
        for (i=0; i < sub_s.length; i++) {
            sub_s[i].checked = false
            cone_size_sort[i] = true
        }
    }
    
    if (index <= 7) {
        for (i=0; i < sub_s.length; i++) {
            sub_s[i].checked = false
            cone_size_sort[i] = false
        }
        sub_s[index].checked = true
        cone_size_sort[index] = true
        main_radio[0].checked = false
    } else if (index <= 14) {
        for (i=0; i < sub_c.length; i++) {
            sub_c[i].checked = false
            cone_color_sort[i] = false
        }
        sub_c[index-8].checked = true
        cone_color_sort[index-8] = true
        main_radio[1].checked = false
    } else if (index <= 18) {
        for (i=0; i < sub_t.length; i++) {
            sub_t[i].checked = false
            cone_strap_sort[i] = false
        }
        sub_t[index-15].checked = true
        cone_strap_sort[index-15] = true
        main_radio[2].checked = false
    } else if (index <= 20) {
        for (i=0; i < sub_b.length; i++) {
            sub_b[i].checked = false
            cone_base_sort[i] = false
        }
        sub_b[index-19].checked = true
        cone_base_sort[index-19] = true
        main_radio[3].checked = false
    }
}

function updateProductsList() {
    let product_boxes = document.querySelectorAll("#box-container .box");
    let container = document.querySelector("#box-container");
    
    container.classList.toggle("transition");

    setTimeout(
        function() {
            for (i = 0; i < product_boxes.length; i++) {
                product_boxes[i].style.display = "block";
            }

            for (i = 0; i < product_boxes.length; i++) {
                const size = parseInt(product_boxes[i].childNodes[5].textContent);
                const color = parseInt(product_boxes[i].childNodes[7].textContent);
                const strap = parseInt(product_boxes[i].childNodes[9].textContent);
                const base = parseInt(product_boxes[i].childNodes[11].textContent);

                if (cone_size_sort[size - 1] == false) {
                    product_boxes[i].style.display = "none";
                }
                if (cone_color_sort[color - 1] == false) {
                    product_boxes[i].style.display = "none";
                }
                if (cone_strap_sort[strap - 1] == false) {
                    product_boxes[i].style.display = "none";
                }
                if (cone_base_sort[base - 1] == false) {
                    product_boxes[i].style.display = "none";
                }

                if (size == 0) {
                    if (other_sort == false) {
                        product_boxes[i].style.display = "none";
                    }
                }
            }
            
            container.classList.remove("transition");
        }, 1000);
}

function generateProductsData(no, name, code, size, color, strap, base, base_detail, material) {
    const new_box = box.cloneNode(true);
    box_container.appendChild(new_box);

    const prod_pic = new_box.childNodes[3].childNodes[1];
    const prod_name = new_box.childNodes[1];
    const prod_size = new_box.childNodes[5];
    const prod_color = new_box.childNodes[7];
    const prod_strap = new_box.childNodes[9];
    const prod_base = new_box.childNodes[11];
    const prod_det = new_box.childNodes[13];
    const prod_mat = new_box.childNodes[15];

    new_box.id = no;
    prod_pic.src = "webp_pic/" + code;
    prod_name.textContent = name;
    prod_size.textContent = size;
    prod_color.textContent = color;
    prod_strap.textContent = strap;
    prod_base.textContent = base;
    prod_det.textContent = base_detail;
    prod_mat.textContent = material;
}

function organizingJSON(data, i) {
    if (i == 0) {
        if (data.length > 0) {
            for (j = 0; j < data.length; j++) {
                var no = data[j].No;
                var name = data[j].Name;
                var code = data[j].Code;
                var size = data[j].Size;
                var color = data[j].Color;
                var strap = data[j].Strap;
                var base = data[j].Base;
                var base_detail = data[j].Detail;
                var material = data[j].Material;

                generateProductsData(no, name, code, size, color, strap, base, base_detail, material);
            }
        }
    }
}

function deleteFirstBox() {
    box.remove()
}

onscroll = () => {
    if (scrollY != 0) {
        top_button.style.display = "block"
    } else {
        top_button.style.display = "none"
    }
}

function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

let slideIndex = 1;
    showSlides(slideIndex);
    setTimeout(autoSlides, 10000);
  
function plusSlides(n) {
    showSlides(slideIndex += n);
}
  
function currentSlide(n) {
    showSlides(slideIndex = n);
}
  
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
  
function autoSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(autoSlides, 5000);
}

function showDetailof(product_box) {
    let details_box = document.getElementById("product-detail");

    details_box.classList.toggle("transition");

    details_box.childNodes[1].childNodes[5].childNodes[4].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[5].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[7].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[8].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[10].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[11].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[13].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[14].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[16].style.display = "block"
    details_box.childNodes[1].childNodes[5].childNodes[17].style.display = "block"
    
    const new_pic = product_box.childNodes[3].childNodes[1].src;
    const new_name = product_box.childNodes[1].textContent;
    var new_size = product_box.childNodes[5].textContent;
    var new_color = product_box.childNodes[7].textContent;
    var new_strap = product_box.childNodes[9].textContent;
    const new_base = product_box.childNodes[13].textContent;
    const new_material = product_box.childNodes[15].textContent;

    // define vaLue
    if (new_size == "1") {
        new_size = "26 ซม.";
    } else if (new_size == "2") {
        new_size = "30 ซม.";
    } else if (new_size == "3") {
        new_size = "45 ซม.";
    } else if (new_size == "4") {
        new_size = "50 ซม.";
    } else if (new_size == "5") {
        new_size = "60 ซม.";
    } else if (new_size == "6") {
        new_size = "70 ซม.";
    } else if (new_size == "7") {
        new_size = "80 ซม.";
    } else if (new_size == "8") {
        new_size = "90 ซม.";
    }

    if (new_color == "1") {
        new_color = "ส้ม(ธรรมดา)";
    } else if (new_color == "2") {
        new_color = "แดง";
    } else if (new_color == "3") {
        new_color = "เหลือง";
    } else if (new_color == "4") {
        new_color = "น้ำเงิน";
    } else if (new_color == "5") {
        new_color = "เขียว";
    } if (new_color == "6") {
        new_color = "ขาว";
    } if (new_color == "7") {
        new_color = "ดำ";
    }

    if (new_strap == "1") {
        new_strap = "ไม่มี";
    } else if (new_strap == "2") {
        new_strap = "สติกเกอร์ขาว";
    } else if (new_strap == "3") {
        new_strap = "สะท้อนแสง";
    } else if (new_strap == "4") {
        new_strap = "ห้ามจอด";
    }

    // img
    details_box.childNodes[1].childNodes[3].childNodes[1].src = new_pic;
    // detail
    details_box.childNodes[1].childNodes[5].childNodes[2].textContent = new_name;
    details_box.childNodes[1].childNodes[5].childNodes[5].textContent = new_size;
    details_box.childNodes[1].childNodes[5].childNodes[8].textContent = new_color;
    details_box.childNodes[1].childNodes[5].childNodes[11].textContent = new_strap;
    details_box.childNodes[1].childNodes[5].childNodes[14].textContent = new_base;
    details_box.childNodes[1].childNodes[5].childNodes[17].textContent = new_material;

    if (new_size == 0) {
        details_box.childNodes[1].childNodes[5].childNodes[4].style.display = "none"
        details_box.childNodes[1].childNodes[5].childNodes[5].style.display = "none"
    }
    if (new_color == 0) {
        details_box.childNodes[1].childNodes[5].childNodes[7].style.display = "none"
        details_box.childNodes[1].childNodes[5].childNodes[8].style.display = "none"
    }
    if (new_strap == 0) {
        details_box.childNodes[1].childNodes[5].childNodes[10].style.display = "none"
        details_box.childNodes[1].childNodes[5].childNodes[11].style.display = "none"
    }
    if (new_base == 0) {
        details_box.childNodes[1].childNodes[5].childNodes[13].style.display = "none"
        details_box.childNodes[1].childNodes[5].childNodes[14].style.display = "none"
    }
    if (new_material == 0) {
        details_box.childNodes[1].childNodes[5].childNodes[16].style.display = "none"
        details_box.childNodes[1].childNodes[5].childNodes[17].style.display = "none"
    }
}

function closeDetailsBox() {
    let details_box = document.getElementById("product-detail");
    details_box.classList.remove("transition");
}

function openArticle(child) {
    child.parentNode.childNodes[5].style.display = "block"
    // child.parentNode.childNodes[5].classList.toggle(active)
    child.parentNode.childNodes[7].style.display = "none"
    child.parentNode.childNodes[9].style.display = "block"
}

function closeArticle(child) {
    child.parentNode.childNodes[5].style.display = "none"
    // child.parentNode.childNodes[5].classList.remove(active)
    child.parentNode.childNodes[7].style.display = "block"
    child.parentNode.childNodes[9].style.display = "none"
}