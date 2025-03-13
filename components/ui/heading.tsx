interface HeadingProps {
    title: string;
    description: string;
    className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ 
    title, 
    description,
    className 
}) => {
    return (
        <div className={`pb-4 mb-4 border-b ${className}`}>
            <h2 className="text-3xl font-bold tracking-tight text-blue-900 flex items-center gap-2">
                {title}
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-3xl">
                {description}
            </p>
        </div>
    )
}