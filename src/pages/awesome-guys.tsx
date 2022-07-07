// Step 1: Import React
import * as React from "react";
import TransitionLink from "gatsby-plugin-transition-link";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { getUnit, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../static/css/awesome.css";
import { Helmet } from "react-helmet";
// Step 2: Define your component
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
gsap.registerPlugin(ScrollTrigger);
interface State {
  guys: {
    name: string;
    link: string;
    imgs: string[];
  }[];
}
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
class Guys extends React.Component<any, State> {
  readonly state: Readonly<State> = {
    guys: [
      {
        name: "TTSUXX",
        link: "https://ttsuxx.cc/",
        imgs: [
          "https://p.sda1.dev/2/85d0111c49a5c7f814c56ab8138d4b0c/ewsdg.jpg",
          "https://p.sda1.dev/6/463bb423ee7c9a026876f66e7ea0af27/Screenshot_20220707_144219.png",
          "https://p.sda1.dev/2/aef036aac2f7aba2ff5f3248a0912522/90589717_p0.png",
        ],
      },
      {
        name: "LittleRewriter",
        link: "https://www.lirewriter.cn/",
        imgs: [
          "https://www.lirewriter.cn/images/eren.jpg",
          "https://p.sda1.dev/6/389a3ff3d791b741e07ac95a353084cc/Screenshot_20220707_150839.png",
          "https://cdn.pic.hlz.ink/2021/12/02/60ed54303c3ba.jpg"
        ]
      },
      {
        name: "GoldenPotato137",
        link: "https://www.goldenpotato.cn/",
        imgs: [

        ]
      },
      {
        name: "Rye_Catcher",
        link: "https://www.cnblogs.com/Rye-Catcher/",
        imgs: []
      },
      {
        name: "sparrow",
        link: "https://sparrow.sakuragaming.org/link/",
        imgs: ["https://avatars.githubusercontent.com/u/32926102?v=4"]
      },
      {
        name: "Ajsoabk",
        link: "http://ajsoabk.xyz/",
        imgs:[]
      }
    ],
  };
  
  componentDidMount(): void {
    const { height, width } = getWindowDimensions();
    shuffle(this.state.guys)
    document.body.style.overflow = "auto";
    document.scrollingElement.scrollTo(0, 0);
    gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

    gsap.utils.toArray("section").forEach((section, index) => {
      const w = section.querySelector(".wrapper");
      const [x, xEnd] =
        index % 2
          ? ["100%", section.offsetWidth*-0.5*width/1400]
          : [w.scrollWidth * -1, 200*width/1400];
      gsap.fromTo(
        w,
        { x },
        {
          x: xEnd,
          scrollTrigger: {
            trigger: section,
            scrub: 1,
          },
        }
      );
    });
  }
  render(): React.ReactNode {
    let guys = this.state.guys;
    return (
      <div>
        <div className="demo-wrapper">
          <header className="df aic jcc">
            <div>
              <h1>Awesome Guys</h1>
              <h2>
                <AniLink swipe duration={0.33} direction="down" to="/">
                  ⬆️
                </AniLink>
              </h2>
            </div>
          </header>
          {guys.map((guy) => {
              return (
                <div>
                  <section className="demo-text">
                    <div className="wrapper text">
                      <a href={guy.link}>{guy.name}</a>
                    </div>
                  </section>
                  <section className="demo-gallery">
                    <ul className="wrapper">
                      {guy.imgs.map((img) => {
                        return (
                          <li>
                            <img  src={img} />
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </div>
              );
            
          })}
        </div>
        <header className="df aic jcc">
            <div>
              <h1>Awesome Guys</h1>
              <h2>
                <AniLink swipe duration={0.33} direction="down" to="/">
                  ⬆️
                </AniLink>
              </h2>
            </div>
          </header>
      </div>
    );
  }
}

const awesome_guys = () => {
  return (
    <main>
      <title>Awesome guys!</title>
      <Guys></Guys>
    </main>
  );
};

// Step 3: Export your component
export default awesome_guys;
