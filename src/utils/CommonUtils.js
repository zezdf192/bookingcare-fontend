class CommonUtils {
    static getBase64 = (file) =>
        new Promise(function (resolve, reject) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject('Error: ', error);
        });
}

export default CommonUtils;
