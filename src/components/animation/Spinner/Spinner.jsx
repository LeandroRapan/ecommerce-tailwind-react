import '../Spinner.css';

const Spinner = () => {
    return (
        <div className="flex items-start justify-center h-screen">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-8 border-t-8 border-t-blue-500 border-b-transparent rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-8 border-b-8 border-b-red-500 border-t-transparent rounded-full animate-spin-reverse"></div>
                <div className="absolute w-8 h-8 rounded-full animate-pulse animate-color-transition"></div>
            </div>
        </div>
    );
};

export default Spinner;