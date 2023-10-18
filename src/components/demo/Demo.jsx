import "./style.css";
import {linkIcon} from "../../assets";
import {copy} from "../../assets";
import {loader} from "../../assets";
import {tick} from "../../assets";

import {useEffect, useState} from "react";
import {useLazyGetSummaryQuery} from "../../redux-store/articleAPI";
const Demo = () => {
    // states
    const [article, setArticle] = useState({
        url: "",
        summary: "",
    });

    const [allAricles, setAllArticles] = useState([]);

    const [copied, setCopied] = useState("")

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();


    // functions
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await getSummary({articleUrl: article.url});
        if (data.summary) {
            const newArticle = {...article, summary: data.summary};
            const updatedArticles = [newArticle, ...allAricles];
            setArticle(newArticle);
            setAllArticles(updatedArticles);
            localStorage.setItem("articles", JSON.stringify(updatedArticles));
        }
    };

    const handleDelete = (indx) => {

        console.log("delted", indx)
        const newArticles = allAricles.filter((e,i)=> i!==indx)
        setAllArticles(newArticles)
        console.log(allAricles)
        localStorage.setItem("articles",JSON.stringify(newArticles))
    }

    const handleCopy = (url) => {
        console.log(url)
        navigator.clipboard.writeText(url)
        setCopied(url)
        setTimeout(()=>setCopied(false),3000)
    }
    useEffect(() => {
        const articlesLocalStorage = localStorage.getItem("articles");
        if (articlesLocalStorage) {
            setAllArticles(JSON.parse(articlesLocalStorage));
        }
    }, []);

    // component
    return (
        <section className="main">
            {/* start form  */}
            <form onSubmit={handleSubmit} className="flex items-center w-full bg-white">
                <img src={linkIcon} />
                <input
                    value={article.url}
                    onChange={(e) => setArticle({...article, url: e.target.value})}
                    type="url"
                    placeholder="Enter a URL"
                    className="input-filed peer"
                    required
                />
                <button className=" border-[2px] black_btn text-white peer-focus:border-[#0079ff]">submit</button>
            </form>
            {/* end form  */}

            {/*start  display History  */}
            {allAricles.map((elem, indx) => (
                <div
                    key={indx}
                    className="history-section flex justify-between bg-white p-[10px] rounded-[10px] text-[#0079ff]"
                >
                    <div className=" flex items-center">
                        <img src={copied == elem.url ? tick : copy}
                        onClick={()=>handleCopy(elem.url)}
                            alt="copy_icon"
                            className=" mr-3 cursor-pointer " />
                    <p onClick={() => setArticle(elem)} className="cursor-pointer">{elem.url}</p>
                    </div>
                    <button className="black_btn"
                    onClick={()=>handleDelete(indx)}
                    >Delete</button>
                </div>
            ))}
            {/*end display History  */}

            {/* start  display Summray  */}
            <div className=" flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="Loading" />
                ) : error ? (
                    <p>error</p>
                ) :article.summary? (
                    <div className=" flex flex-col p-[20px]">
                        <h1 className=" m-auto font-bold text-2xl">
                            Article <span className=" text-[#0079ff]"> Summary</span>
                        </h1>
                        <p className="summary-content">{article.summary}</p>
                    </div>
                ):null}
            </div>
            {/* end  display Summray  */}
        </section>
    );
};

export default Demo;
