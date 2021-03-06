import React, { Component } from "react";
import debounce from 'lodash/debounce';
import M from 'materialize-css';

class Kaynaklar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: [],
            channels: [],
            filterChannelID: "",
            pageCount: [],
            searchQuery: "",
            pageNum: 0
        };
        this.fetchKaynakDataDebounced = debounce(this.fetchKaynakData, 500)
        this.fetchPageCountDebounced = debounce(this.fetchPageCount, 500)
    }
    componentWillMount() {
        const dropdown = document.querySelectorAll("select");
        M.FormSelect.init(dropdown);
        document.title = "Eksicode.org - Kaynaklar";
        this.fetchKaynakData();
        this.fetchTelegramChannels();
        this.fetchPageCount();
    }
    async fetchTelegramChannels() {
        const res = await fetch("https://api.eksicode.org/telegrams");
        const channels = await res.json();
        this.setState({channels});
    }
    async fetchPageCount() {
        const res = await fetch(`https://api.eksicode.org/kaynaklars/count?${
        this.state.filterChannelID ? "&doc_tg_ch=" + this.state.filterChannelID : ""
        }${this.state.searchQuery ? "&doc_name_contains=" + this.state.searchQuery : ""}&approved=true`);
        const data = await res.json();

        const count = parseInt(data, 10);

        let pageCount;

        if (count % 24 > 0) {
            pageCount = Math.floor(count / 24) + 1;
        } else {
            pageCount = Math.floor(count / 24);
        }

        this.setState({ pageCount });
    }
    async fetchKaynakData() {
        const res = await fetch(
            `https://api.eksicode.org/kaynaklars?${
            this.state.searchQuery ? "doc_name_contains=" + this.state.searchQuery : ""
            }&_start=${this.state.pageNum * 24}&_limit=${24}${
                this.state.filterChannelID ? "&doc_tg_ch=" + this.state.filterChannelID : ""
            }&approved=true`
        );
        const data = await res.json();

        if (data.length) {
            this.setState({ sources: data });
        } else {
            this.setState({ sources: "none" });
        }
    }
    componentDidUpdate(previousProps, previousState) {
        if (this.state.pageNum !== previousState.pageNum || 
            this.state.filterChannelID !== previousState.filterChannelID ||
            this.state.searchQuery !== previousState.searchQuery) {
            this.fetchKaynakDataDebounced();
            this.fetchPageCountDebounced();
        }

        window.scrollTo(0, 0)

        if ((this.state.filterChannelID !== previousState.filterChannelID ||
            this.state.searchQuery !== previousState.searchQuery) && this.state.pageNum > 0) {
            this.setState({ pageNum: 0 });
        }

        if (previousState.channels !== this.state.channels) {
            const dropdown = document.querySelectorAll("select");
            M.FormSelect.init(dropdown);
        }
    }
    nextPage() {
        this.setState(state => {
            return { pageNum: state.pageNum + 1 };
        });
    }
    prevPage() {
        if (this.state.pageNum > 0) {
            this.setState(state => {
                return { pageNum: state.pageNum - 1 };
            });
        }
    }
    createPages() {
        let pages = [];
        for (let i = 0; i < this.state.pageCount; i++) {
            pages.push(
                <li key={i}
                className={`${
                        this.state.pageNum === i ? "active light-green" : ""
                    }  waves-effect`}
                >
                    <a onClick={() => this.setState({ pageNum: i })}>{i + 1}</a>
                </li>
            );
        }
        return pages;
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col m12 l6">
                        <h1>Kaynaklar</h1>
                    </div>
                    <div className="col m12 l6">
                        <p className="flow-text">
                            İlgilendiğin yazılım dili veya konular ile ilgili
                            kaynakları burada bulabilirsin.
                        </p>
                    </div>
                </div>
                <div className="row">
                        <div className="input-field col l4 m5 s12">
                            <select defaultValue="" onChange={e => this.setState({filterChannelID: e.target.value})}>
                                <option value="" disabled>Grup Seçin</option>
                                <option value="">Tümü</option>
                                {this.state.channels.map(e => {
                                    return <option key={e.id} value={e.channelID}>{e.name}</option>
                                })}
                            </select>
                            <label>Grup</label>
                        </div>
                        <div className="input-field search col l8 m7 s12">
                            <input value={this.state.searchQuery} onChange={e => this.setState({searchQuery: e.target.value})} id="search" type="text" className="validate" />
                            <label className="active" htmlFor="search">Ara</label>
                        </div>
                </div>
                {(() => {
                    if (this.state.sources.length && this.state.sources !== "none") {
                        return (
                            <div className="row">
                                <ul className="kaynaklar">
                                        {this.state.sources.map(e => {
                                            return (
                                              <li key={e.id}>
                                                <a 
                                                    href={
                                                        e.doc_link
                                                        }
                                                    target="_blank"
                                                    rel="noopener noreferrer" 
                                                >
                                                    {e.doc_name}
                                                </a>
                                            </li>
                                            );
                                        })}
                                </ul>
                                <ul className="pagination center">
                                    <li
                                        onClick={this.prevPage.bind(this)}
                                        className={
                                            this.state.pageNum === 0
                                                ? "disabled"
                                                : "waves-effect"
                                        }
                                    >
                                        <i className="material-icons">
                                            chevron_left
                                        </i>
                                    </li>
                                    {this.createPages()}
                                    <li
                                        onClick={this.nextPage.bind(this)}
                                        className={
                                            this.state.pageNum ===
                                            this.state.pageCount - 1
                                                ? "disabled"
                                                : "waves-effect"
                                        }
                                    >
                                        <i className="material-icons">
                                            chevron_right
                                        </i>
                                    </li>
                                </ul>
                            </div>
                        );
                    } else if (this.state.sources === "none") {
                        return (
                            <div className="row center">
                                <b>Hiç sonuç yok.</b>
                            </div>
                        )
                    } else {
                        return (
                            <div className="row center">
                                <div className="preloader-wrapper small active">
                                    <div className="spinner-layer spinner-eksicode-only">
                                        <div className="circle-clipper left">
                                            <div className="circle" />
                                        </div>
                                        <div className="gap-patch">
                                            <div className="circle" />
                                        </div>
                                        <div className="circle-clipper right">
                                            <div className="circle" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })()}
            </div>
        );
    }
}

export default Kaynaklar;
