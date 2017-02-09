var dataroot = 'data/' 
var globalDatasourceMap = {
	template: {
		url: (dataroot + 'sampleData.json')
	},
	fever: {
		url: (dataroot + 'heatmap-fever.json')
	},
	hepatitis: {
		url: (dataroot + 'heatmap-hepatitis.json')
	},
	labValues: {
		url: (dataroot + 'Preprocessed-WBC_Obfuscated-3125816481374367342.csv.cishelltable.json')
	},
	//TODO: Fix
	labValues2: {
		url: (dataroot + 'Preprocessed-WBC_Obfuscated-3125816481374367342.csv.cishelltable.json')
	},
	flaghourgroupintervalgroup: {
		url: (dataroot + 'flaghourgroupintervalgroup.json')
	},
	flaghourintervalgroup: {
		url: (dataroot + 'flaghourintervalgroup.json')
	},
	valuehourgroupintervalgroup: {
		url: (dataroot + 'valuehourgroupintervalgroup.json')
	},
	bipartite: {
		url: (dataroot + 'bipartite.json')
	},
	//i2b2 Request Service Endpoint
	i2b2Endpoint: {
		url: ('http://demo.cns.iu.edu/client/hsd/live/lib/proxy.php'),
		isi2b2: true,
		template: (dataroot + 'i2b2request.xml')
	}
}