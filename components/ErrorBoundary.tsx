import React, { Component } from "react";
import Image from "next/image";

export default class ErrorBoundary extends Component<
  { children: any },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    return;
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="Container">
          <div className="WhitePaper">
            <img
              width="112"
              height="112"
              src="https://cloudflare-ipfs.com/ipfs/QmTYnJtr16S8wp6imG9RtrYTko7FSXLyJzUA8njSuDGN7C"
              alt=""
            />
            <div
              className="WhitePaperBody"
              style={{ marginTop: "10px", fontSize: "18px", fontWeight: 600 }}
            >
              Whoops! Something unexpected happened.
            </div>
          </div>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}
