interface PaginationProps {
	pageSize: number;
	currentPage: number;
	amount: number;
	onChangePage: (page: number) => void;
}

const Pagination = ({ pageSize, currentPage, amount, onChangePage }: PaginationProps) => {
	const pages = new Array(Math.ceil(amount / pageSize)).fill(0).map((item, idx) => idx + 1);

	if (pages.length <= 1) return null;
	return (
		<ul className="pagination">
			{pages.map((page) => (
				<li key={page} className="page-item">
					<button
						className={`page-link ${page === currentPage ? "active" : ""}`}
						onClick={() => onChangePage(page)}
					>
						{page}
					</button>
				</li>
			))}
		</ul>
	);
};

export default Pagination;
