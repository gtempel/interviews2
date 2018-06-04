# Data Binding

## Q: What are two-way data binding and one-way data flow, and how are they different?

_Two way data binding_ means that UI fields are bound to model data dynamically such that when a UI field changes, the model data changes with it and vice-versa.

_One way data flow_ means that the model is the single source of truth. Changes in the UI trigger messages that signal user intent to the model (or “store” in React). Only the model has the access to change the app’s state. The effect is that data always flows in a single direction, which makes it easier to understand.

One way data flows are deterministic, whereas two-way binding can cause side-effects which are harder to follow and understand.

## Good to hear:

* React is the new canonical example of one-way data flow, so mentions of React are a good signal. Cycle.js is another popular implementation of uni-directional data flow.
* Angular is a popular framework which uses two-way binding.

## Red flags:

* No understanding of what either one means. Unable to articulate the difference.


