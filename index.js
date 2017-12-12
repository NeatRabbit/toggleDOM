var toggleStore = [];

var toggleDOM = (function() {
	var targetElements;

	function toggleDOM(selectors) {
		if (!selectors) return;
		revert();
		setElements(selectors);
		check();
		remove();
	}

	function setElements(selectors) {
		if (typeof selectors.length !== 'undefined') {
			var imax = selectors.length;
			targetElements = [];

			for (var i = 0; i < imax; i++) {
				var nodeList = document.querySelectorAll(selectors[i]);
				var jmax = nodeList.length;

				for (var j = 0; j < jmax; j++) {
					targetElements.push(nodeList[j]);
				}
			}
		} else if (elements.nodeType && elements.nodeType === 1) {
			targetElements = document.querySelectorAll(selectors);
		}
	}

	function check() {
		var imax = targetElements.length;

		for (var i = 0; i < imax; i++) {
			if (targetElements[i].toggled) {
				var storeIndex;
				if (toggleStore.indexOf) {
					storeIndex = toggleStore.indexOf(targetElements[i].toggled);
				} else {
					storeIndex = searchStoreIndex(targetElements[i].toggled);
				}

				targetElements[i].style.display = targetElements[i].toggled.display;
				targetElements[i].toggled.toggleComment.parentNode.removeChild(targetElements[i].toggled.toggleComment);
				toggleStore.splice(storeIndex, 1);
				delete targetElements[i].toggled;
			} else {
				toggleComment(targetElements[i]);
			}
		}
	}

	function revert() {
		var imax = toggleStore.length;

		for (var i = 0; i < imax; i++) {
			toggleStore[i].element.style.display = 'none';
			toggleStore[i].element.toggled = toggleStore[i];
			toggleStore[i].toggleComment.parentNode.insertBefore(toggleStore[i].element, toggleStore[i].toggleComment);
		}
	}

	function remove() {
		var imax = toggleStore.length;

		for (var i = 0; i < imax; i++) {
			if (toggleStore[i].element.parentNode) {
				toggleStore[i].element.parentNode.removeChild(toggleStore[i].element);
			}
		}
	}

	function toggleComment(targetElement) {
		var commentNode = document.createComment('toggleDOM');

		targetElement.parentNode.insertBefore(commentNode, targetElement);
		targetElement.parentNode.removeChild(targetElement);
		targetElement.toggled = targetElement.style.display;
		toggleStore.push({
			element: targetElement,
			toggleComment: commentNode,
			display: targetElement.style.display
		});
	}

	function searchStoreIndex(target) {
		var imax = toggleStore.length;
		var index;

		for (var i = 0; i < imax; i++) {
			if (toggleStore[i] === target) {
				index = i;
				break;
			}
		}

		return index;
	}

	return toggleDOM;
})();