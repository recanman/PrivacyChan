// made by recanman
const GetStaticAsset = async (res, url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then(data => {
			if (data.headers.get("Content-Type") == "text/css") {
				data.text().then(css => {
					res.setHeader("Content-Type", "text/css")
					css = css.replace("//s.4cdn.org/", "/static/asset/")

					res.send(css)
				})
				return
			}

			data.body.pipeTo(
				new WritableStream({
					start() {
						data.headers.forEach((v, n) => res.setHeader(n, v))
                  	},
                  	write(chunk) {
                    	res.write(chunk)
                  	},
                  	close() {
                    	res.end()
                    	resolve()
                 	}
				})
			)
		}).catch(reject)
	})
}

module.exports = {
	GetStaticAsset
}