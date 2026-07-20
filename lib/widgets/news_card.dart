import 'package:flutter/material.dart';

class NewsCard extends StatelessWidget {
  final String title;
  final String? summary;
  final String? imageUrl;
  final DateTime? date;
  final VoidCallback? onTap;

  const NewsCard({
    super.key,
    required this.title,
    this.summary,
    this.imageUrl,
    this.date,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (imageUrl != null)
              Image.network(
                imageUrl!,
                height: 180,
                width: double.infinity,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const SizedBox(
                  height: 180,
                  child: Center(child: Icon(Icons.broken_image)),
                ),
              ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  if (summary != null) ...[
                    const SizedBox(height: 8),
                    Text(summary!, maxLines: 2, overflow: TextOverflow.ellipsis),
                  ],
                  if (date != null) ...[
                    const SizedBox(height: 8),
                    Text(
                      '${date!.day}/${date!.month}/${date!.year}',
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
