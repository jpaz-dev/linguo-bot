export interface TenorGif {
	url: string;
}

export interface TenorMedia {
	gif: TenorGif;
}

export interface TenorResults {
	title: string;
	media: TenorMedia[];
}

export default interface TenorSearch {
	results: TenorResults[];
}
