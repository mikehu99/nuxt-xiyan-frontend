import service from '@/utils/request'

//oss上传图片
export function upLoadImg(formData) {
    service({
        url: '/upload/uploadFile',
        formData:formData,
        method: 'post'
    })
}
