function Stars({rating}) {

    let stars = "";
    if(rating > 4) {
        stars = <div><i className="fa-solid fa-star" style={{color: "#ffffff"}}></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i></div>;
    } else if(rating > 3) {
        stars = <div><i className="fa-solid fa-star" style={{color: "#ffffff"}}></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i></div>;
    } else if(rating > 2) {
        stars = <div><i className="fa-solid fa-star" style={{color: "#ffffff"}}></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></div>;
    } else if(rating > 1) {
        stars = <div><i className="fa-solid fa-star" style={{color: "#ffffff"}}></i><i className="fa-solid fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></div>;
    } else {
        stars = <div><i className="fa-solid fa-star" style={{color: "#ffffff"}}></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i><i className="fa-regular fa-star"></i></div>;
    }




    return( stars);

}

export default Stars;