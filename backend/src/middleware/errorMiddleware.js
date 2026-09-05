export default function errorMiddleware(err, req, res, next) {
	console.error(`Error: ${req.method + " " + req.path}:`, err.stack || err);

	if (res.headersSent) {
		return next(err);
	}
	const status = err.status || err.statusCode ||  res.statusCode !== 200 || 500;
	const message = status < 500 ? err.message : "something went wrong";
	res.status(status).json({
		message,
	});
}
