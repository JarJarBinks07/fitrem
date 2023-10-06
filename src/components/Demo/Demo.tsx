import React, { Component, createRef } from "react";
import ReactFreezeframe from "./components/ReactFreezeframe";
import { Freeze } from "freezeframe/types";
import "./Demo.css";

export type State = {
  visible: boolean;
};

class Demo extends Component<any, State> {
  private freeze = createRef<ReactFreezeframe>();

  constructor(props: any) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  private logEvent(event: string, items: Freeze[], isPlaying: boolean): void {
    console.log(event, items, isPlaying);
  }

  private start() {
    this.freeze.current?.start();
  }

  private stop() {
    this.freeze.current?.stop();
  }

  private toggle() {
    this.freeze.current?.toggle();
  }

  private destroy() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <div className="section">
          <ReactFreezeframe
            src="/assets/icons/step_500x500.webp"
            onToggle={(items, isPlaying) => this.logEvent("toggle", items, isPlaying)}
            onStart={(items, isPlaying) => this.logEvent("start", items, isPlaying)}
            onStop={(items, isPlaying) => this.logEvent("stop", items, isPlaying)}
          />
        </div>

        <div className="section">
          <p>start/stop manually, with overlay</p>

          <button onClick={() => this.start()}>Start</button>
          <button onClick={() => this.stop()}>Stop</button>
          <button onClick={() => this.toggle()}>Toggle</button>

          <ReactFreezeframe
            src="/assets/icons/step_500x500.webp"
            ref={this.freeze}
            options={{
              trigger: false,
              overlay: true,
            }}
            onToggle={(items, isPlaying) => this.logEvent("toggle", items, isPlaying)}
            onStart={(items, isPlaying) => this.logEvent("start", items, isPlaying)}
            onStop={(items, isPlaying) => this.logEvent("stop", items, isPlaying)}
          />
        </div>
        <div className="section">
          <p>destroy, remove event listeners</p>

          <button onClick={() => this.destroy()}>Destroy</button>

          {this.state?.visible && (
            <ReactFreezeframe
              src="/assets/icons/step_500x500.webp"
              onToggle={(items, isPlaying) => this.logEvent("toggle", items, isPlaying)}
              onStart={(items, isPlaying) => this.logEvent("start", items, isPlaying)}
              onStop={(items, isPlaying) => this.logEvent("stop", items, isPlaying)}
            />
          )}
        </div>

        <p>
          cinemagraphs by <a href="http://www.cinemagraphs.com/">cinemagraphs.com</a>
        </p>
      </div>
    );
  }
}

export default Demo;
