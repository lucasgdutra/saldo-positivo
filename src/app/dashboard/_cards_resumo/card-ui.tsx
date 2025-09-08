interface CardUIProps {
	title: string;
	value: number;
	variant?: "default" | "revenue" | "expense" | "balance";
}

export function CardUI({ title, value, variant = "default" }: CardUIProps) {
	const getValueColor = () => {
		switch (variant) {
			case "balance":
				return value < 0 ? "text-red-600" : "text-green-600";
			case "revenue":
				return "";
			case "expense":
				return "";
			default:
				return "";
		}
	};

	return (
		<div className="rounded-lg border p-4">
			<div className="text-sm text-muted-foreground">{title}</div>
			<div className={`mt-2 text-2xl font-bold ${getValueColor()}`}>
				{new Intl.NumberFormat("pt-BR", {
					style: "currency",
					currency: "BRL",
				}).format(value)}
			</div>
		</div>
	);
}
