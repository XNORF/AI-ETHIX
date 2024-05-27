import Content from "../components/Content";
import { useParams } from "react-router-dom";

const Guideline = () => {
    const { id } = useParams();

    //RETURN THE HTML
    return (
        <div className="Guideline">
            <Content id={id} type="guideline" />
        </div>
    );
};

export default Guideline;
