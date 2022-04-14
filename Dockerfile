ARG IMAGE_DOMAIN=docker.io

FROM ${IMAGE_DOMAIN}/${IMAGE_NAMESPACE}/rbd-ui-base:${VERSION}
ADD dist /dist
