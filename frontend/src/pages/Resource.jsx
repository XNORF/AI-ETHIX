import Content from "../components/Content";
import { useParams } from "react-router-dom";

const Resource = () => {
    const { id } = useParams();
    //RETURN THE HTML
    return (
        <div className="Resource">
            <Content id={id} type="resource" />
        </div>
    );
};

export default Resource;
