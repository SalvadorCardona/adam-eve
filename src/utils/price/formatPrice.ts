export default function formatPrice(
  price: string | number | undefined | null,
): string {
  return price ? `${price} €` : ""
}
