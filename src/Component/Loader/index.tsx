import { imagePath } from '../../utils/images'
// import { loader_text } from '../../utils/commonData';

const LoaderComponent: React.FC = () => {
    // const [loaderRandomKey, setLoaderRandomKey] = useState(1);

    // useEffect(() => {
    //     setLoaderRandomKey(Math.floor(Math.random() * 11));
    // }, []);

    return (
        <>
            <div className="loader-container">
                <div>
                    <img
                        src={imagePath.loader}
                        alt="loader"
                        className="loader"
                        loading="lazy"
                    />
                    {/* <div>
                        {loader_text[loaderRandomKey] !== undefined &&
                            loader_text[loaderRandomKey] !== null
                            ? loader_text[loaderRandomKey]
                            : ''}
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default LoaderComponent
