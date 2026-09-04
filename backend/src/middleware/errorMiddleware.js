export default function errorMiddleware(err, req, res, next) {
	console.error(`Error: ${req.method + " " + req.path}:`, err.stack || err);

	if (res.headersSent) {
		return next(err);
	}
	const message = err?.message || "something went wrong";
	res.status(500).json({
		message,
	});
}
