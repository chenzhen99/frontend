import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const Imgs = [
  {
    img: require("../../assets/airpods.png"),
  },
  {
    img: require("../../assets/iphone.png"),
  },
  {
    img: require("../../assets/tablet.png"),
  },
];

export default function Carousel() {

  const containerRef = useRef<HTMLDivElement>(null);
  const warpRef = useRef(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentImg, setCurrentImg] = useState(Imgs[0].img);

  let currentLeft = 0;
  let timer:any = null;

  useEffect(() => {

    containerRef.current && setImgWidth(containerRef.current?.offsetWidth);

    if (warpRef.current){
      timer = setInterval(() => {
        console.log(currentLeft, imgWidth);
        let left = currentLeft - imgWidth ;
        if ( left < -((Imgs.length-1) * imgWidth)){
          left = 0;
        }
        currentLeft = left;
        if(!imgWidth) {
          setCurrentImg(Imgs[0]['img'])
        } else {

          setCurrentImg(Imgs[Math.abs(left / imgWidth)]['img'])
        }
        setScrollLeft( left );
      }, 2000)
    }
    return () => {
      timer && clearInterval(timer)
    }
  }, [containerRef.current])

  return (
    <div className={styles.carouselContainer} ref={containerRef}  onScroll={(e) => {
      console.log(e.target);
    }}>
      <ul
        className={styles.warp}
        style={{
          width: imgWidth
            ? imgWidth * Imgs.length
            : "100%",
          left: scrollLeft,
          transitionDuration: scrollLeft === 0 ? '.4s' : `${1}s`,
        }}
        ref={warpRef}

      >
        {Imgs.map((item) => {
          return (
            <li className={styles.imgItem} key={item.img}>
              <img src={item.img} className={styles.img} />
            </li>
          );
        })}
      </ul>

      <ul className={styles.footer}>
        {Imgs.map((item, index) => (
          <li className={styles.footerItem} key={item.img} style={{
            width: 50,
          }}>
            <span className={item.img === currentImg ?`${styles.line} ${styles.move}` : styles.line} ></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
