/**
 *
 * @param {object} rect1
 * @param {object} rect2
 * @returns boolean
 */
export function collisionTop(rect1, rect2) {
	return (
		rect1.position.x <= rect2.position.x + rect2.width &&
		rect1.position.x + rect1.width >= rect2.position.x &&
		rect1.position.y + rect1.height <= rect2.position.y &&
		rect1.position.y + rect1.height + rect1.velocity.y >= rect2.position.y
	);
}

export function collisionBottom(rect1, rect2) {
	return (
		rect1.position.y <= rect2.position.y + rect2.height &&
		rect1.position.y + rect1.velocity.y < rect2.position.y + rect2.height &&
		rect1.position.y >= rect2.position.y &&
		rect1.position.x + rect1.width >= rect2.position.x &&
		rect1.position.x <= rect2.position.x + rect2.width
	);
}

export function collisionSide(rect1, rect2) {
	return (
	// rect1.position.x + rect1.width >= rect2.position.x &&
  // rect1.position.x <= rect2.position.x + rect2.width &&
  // rect1.position.y + rect1.height >= rect2.position.y &&
  // rect1.position.y <= rect2.position.y + rect2.height
    rect1.position.x + rect1.width >= rect2.position.x &&
    rect1.position.x <= rect2.position.x + rect2.width &&
    rect1.position.y + rect1.height >= rect2.position.y &&
    rect1.position.y <= rect2.position.y + rect2.height
	);
}
