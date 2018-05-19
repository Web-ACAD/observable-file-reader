import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


export function readFileAsDataURL(file: Blob): Observable<string>
{
	return Observable.create((observable) => {
		const fileReader = new FileReader;

		fileReader.onload = (() => {
			observable.next(fileReader.result);
			observable.complete();
		});

		fileReader.readAsDataURL(file);
	});
}


export function readFileAsBase64(file: Blob): Observable<string>
{
	return readFileAsDataURL(file).pipe(
		map((data: string) => data.substr(data.indexOf(';base64,') + 8)),
	);
}
