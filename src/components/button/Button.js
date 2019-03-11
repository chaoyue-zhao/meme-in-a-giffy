import React, { Component } from "react";
import { TimelineLite, Elastic, SlowMo, Power3 } from "gsap/TweenMax";

// BUTTON STYLING ADOPTED FROM https://github.com/codrops/DistortedButtonEffects/

class SuperNiceButton extends Component {
  constructor(props) {
    super(props);
    
    this.buttonRef = React.createRef();
    this.filterRef = React.createRef();
    this.bgRef = React.createRef();
  }

  handleButtonClick = () => {
    this.props.click && this.props.click();
    this.clickAnimation();
  } 

  clickAnimation = () => {
    const button = this.buttonRef.current
    const filter = this.filterRef.current;
    const bg = this.bgRef.current;
    const colors = ["#dad706", "#f8fb90", "#589b69"];
    const particleCount = 12;

    const getRandom = (min, max) => {
      return Math.random() * (max - min) + min;
    }
    
    const particles = [];
    const tl = new TimelineLite({
      onUpdate: function () {
        filter.setAttribute("x", 0);
      }
    });

    tl.to(bg, 0.6, { scaleX: 1.05 });
    tl.to(
      bg,
      0.9,
      { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) },
      0.6
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(document.createElement("span"));
      button.appendChild(particles[i]);

      particles[i].classList.add(i % 2 ? "left" : "right");

      const dir = i % 2 ? "-" : "+";
      const r = i % 2 ? (getRandom(-1, 1) * i) / 2 : getRandom(-1, 1) * i;
      const size = i < 2 ? 1 : getRandom(0.4, 0.8);
      const tl = new TimelineLite({
        onComplete: function (i) {
          particles[i].parentNode.removeChild(particles[i]);
          this.kill();
        },
        onCompleteParams: [i]
      });

      tl.set(particles[i], { scale: size });
      tl.to(particles[i], 0.6, {
        x: dir + 20,
        scaleX: 3,
        ease: SlowMo.ease.config(0.1, 0.7, false)
      });
      tl.to(particles[i], 0.1, { scale: size, x: dir + "=25" }, "-=0.1");
      if (i >= 2)
        tl.set(particles[i], {
          backgroundColor: colors[Math.round(getRandom(0, 3))]
        });
      tl.to(particles[i], 0.6, {
        x: dir + getRandom(60, 100),
        y: r * 10,
        scale: 0.1,
        ease: Power3.easeOut
      });
      tl.to(
        particles[i],
        0.2,
        { opacity: 0, ease: Power3.easeOut },
        "-=0.2"
      );
    }
  }

  render() {
    const style = {
      filter: `url("#filter")`
    };

    return (
      <React.Fragment>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="svg-filters"
        >
          <defs>
            <filter id="filter">
              >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="7"
                result="blur"
                ref={this.filterRef}
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        {this.props.fontColor === "black" ? (
          <button
            className="button button-black"
            style={style}
            onClick={this.handleButtonClick}
            ref={this.buttonRef}
            type={this.props.type}
          >
            {this.props.text}
            <span className="button__bg" ref={this.bgRef} />
          </button>
        ) : (
          <button
            className="button"
            style={style}
            onClick={this.handleButtonClick}
            ref={this.buttonRef}
            type={this.props.type}
          >
            {this.props.text}
            <span className="button__bg" ref={this.bgRef} />
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default SuperNiceButton;
