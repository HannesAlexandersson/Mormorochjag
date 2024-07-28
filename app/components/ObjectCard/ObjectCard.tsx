
interface ObjectCardProps {
    title: string;
    description: string;
    image: string;
    price?: number;
    slug: string;
}

interface Object{
    object: ObjectCardProps;
}


const ObjectCard: React.FC<Object> = ({ object }) => {

    return(
        <div className="flex flex-col md:flex-row gap-6 bg-annika-lightGreen shadow-md shadow-slate-600 w-full md:w-2/5 ">
            <div 
                className="w-full md:w-1/2 h-96 bg-center bg-cover bg-no-repeat" 
                style={{ backgroundImage: `url('${object.image}')` }}
            ></div>
            <div className="w-full md:w-1/2 flex flex-col items-start justify-start p-3">
                <h3 className="text-4xl underline underline-offset-4 py-2">{object.title}</h3>
                <p className="text-2xl">{object.description}</p>
                {object.price && <p className="text-2xl">{object.price} kr</p>}                
            </div>
        </div>
    );
}
export default ObjectCard;